const APP_SHELL_CACHE = 'app-shell-v1';
const IMAGE_CACHE = 'image-cache-v1';

// ServiceWorker登録スコープに合わせて、キャッシュするパスのベースを計算する。
// GitHub Pages のようにサブディレクトリ配信になるときに、ルート('/')を
// 取りに行ってしまうと 404 になるため、登録スコープに合わせたパスに揃える。
const scopeUrl = new URL(self.registration.scope);
const BASE_PATH = scopeUrl.pathname.replace(/\/$/, '');

// Core assets required for the app shell.
const APP_SHELL_ASSETS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/index.html`,
  `${BASE_PATH}/manifest.json`,
  `${BASE_PATH}/favicon.ico`,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(APP_SHELL_CACHE).then((cache) => cache.addAll(APP_SHELL_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== APP_SHELL_CACHE && key !== IMAGE_CACHE) {
              return caches.delete(key);
            }
            return null;
          })
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Cache-first strategy for Wikimedia Commons images.
  if (url.hostname.endsWith('wikimedia.org') || url.hostname.endsWith('wikimediacommons.org')) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Cache-first strategy for app shell assets and same-origin navigation.
    if (url.origin === self.location.origin) {
      if (request.mode === 'navigate') {
        event.respondWith(cacheFirst(new Request(`${BASE_PATH}/index.html`), APP_SHELL_CACHE));
        return;
      }

      const isAppShellAsset = APP_SHELL_ASSETS.includes(url.pathname);
    if (isAppShellAsset || request.destination === 'style' || request.destination === 'script' || request.destination === 'font') {
      event.respondWith(cacheFirst(request, APP_SHELL_CACHE));
      return;
    }
  }
});

function cacheFirst(request, cacheName) {
  return caches.match(request).then((cachedResponse) => {
    if (cachedResponse) {
      return cachedResponse;
    }

    return fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(cacheName).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => cachedResponse);
  });
}
