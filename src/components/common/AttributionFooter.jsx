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
    <footer className="viewer-meta-card">
      <div className="max-w-5xl mx-auto flex flex-col gap-1 leading-tight">
        <p className="viewer-meta-title" title={title}>
          {title}
        </p>
        <div className="viewer-meta-lines">
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
        <p className="viewer-meta-filename" aria-label="ファイル名">
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
