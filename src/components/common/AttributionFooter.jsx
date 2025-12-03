import PropTypes from 'prop-types';

const AttributionFooter = ({ image }) => {
  if (!image) return null;

  const {
    source = 'Wikimedia Commons',
    artist = '不明',
    license = '不明',
    title = 'タイトル不明',
  } = image;

  return (
    <footer className="w-full bg-white/95 text-[#333333] px-4 sm:px-6 py-4 sm:py-5 shadow-2xl border-t border-amber-100 rounded-t-3xl">
      <div className="max-w-5xl mx-auto flex flex-col gap-1 leading-tight">
        <p className="text-sm sm:text-base font-bold text-[#FF7043] truncate" title={title}>
          {title}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] sm:text-sm text-gray-700">
          <span>
            出典: <span className="font-semibold">{source}</span>
          </span>
          <span>
            作者: <span className="font-semibold">{artist}</span>
          </span>
          <span>
            ライセンス: <span className="font-semibold">{license}</span>
          </span>
        </div>
        <p className="text-[11px] sm:text-xs text-gray-500 break-all" aria-label="ファイル名">
          ファイル名: {title}
        </p>
      </div>
    </footer>
  );
};

AttributionFooter.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    fullUrl: PropTypes.string.isRequired,
    thumbUrl: PropTypes.string.isRequired,
    artist: PropTypes.string,
    license: PropTypes.string,
    source: PropTypes.string,
    pageUrl: PropTypes.string,
  }),
};

export default AttributionFooter;
