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
    <footer className="w-full bg-black/70 text-gray-100 px-4 sm:px-5 py-3 sm:py-4 backdrop-blur">
      <div className="flex flex-col gap-1 leading-tight">
        <p className="text-xs sm:text-sm font-semibold text-white/90 truncate" title={title}>
          {title}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] sm:text-xs text-gray-200">
          <span>
            出典: <span className="font-medium text-white/90">{source}</span>
          </span>
          <span>
            作者: <span className="font-medium text-white/90">{artist}</span>
          </span>
          <span>
            ライセンス: <span className="font-medium text-white/90">{license}</span>
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] text-gray-300 break-all" aria-label="ファイル名">
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
