/**
 * @typedef {import('../types/ImageItem').ImageItem} ImageItem
 */

const API_ENDPOINT = 'https://commons.wikimedia.org/w/api.php';
const MAX_RESULTS = 30;
const MAX_RETRIES = 3;
const BASE_DELAY_MS = 500;

const baseParams = {
  action: 'query',
  format: 'json',
  origin: '*',
  prop: 'imageinfo',
  iiprop: 'url|extmetadata',
  iiurlwidth: '640',
  generator: 'search',
  gsrlimit: String(MAX_RESULTS),
  gsrnamespace: '6',
};

const wait = (durationMs) => new Promise((resolve) => setTimeout(resolve, durationMs));

const buildUrl = (query) => {
  const url = new URL(API_ENDPOINT);
  Object.entries({ ...baseParams, gsrsearch: query }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });
  return url.toString();
};

const stripHtml = (value = '') => value.replace(/<[^>]*>/g, '').trim();

const fetchWithRetry = async (url, options, attempt = 1) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response;
  } catch (error) {
    if (attempt >= MAX_RETRIES) {
      throw error;
    }
    const delay = BASE_DELAY_MS * 2 ** (attempt - 1);
    await wait(delay);
    return fetchWithRetry(url, options, attempt + 1);
  }
};

const mapPageToItem = (page) => {
  const imageInfo = page?.imageinfo?.[0];
  if (!imageInfo?.url || !imageInfo.thumburl) {
    return null;
  }

  const metadata = imageInfo.extmetadata || {};
  const artist = stripHtml(metadata.Artist?.value || 'Unknown');
  const license = stripHtml(
    metadata.LicenseShortName?.value || metadata.UsageTerms?.value || 'Unknown'
  );

  /** @type {ImageItem} */
  const item = {
    id: page.title?.replace(/^File:/i, '') || String(page.pageid),
    title: page.title || '',
    fullUrl: imageInfo.url,
    thumbUrl: imageInfo.thumburl,
    artist,
    license,
    source: 'Wikimedia Commons',
    pageUrl:
      imageInfo.descriptionurl ||
      `https://commons.wikimedia.org/wiki/${encodeURIComponent(page.title)}`,
  };

  return item;
};

export const fetchImages = async (query) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return [];
  }

  const url = buildUrl(trimmedQuery);
  const response = await fetchWithRetry(url, { method: 'GET' });
  const data = await response.json();

  if (!data?.query?.pages) {
    return [];
  }

  const items = Object.values(data.query.pages)
    .map(mapPageToItem)
    .filter(Boolean);

  return items;
};

export default fetchImages;
