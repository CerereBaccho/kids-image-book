import PropTypes from 'prop-types';
import { useRef } from 'react';

const SWIPE_THRESHOLD_PX = 50;

const ImageSwiper = ({ image, onSwipe }) => {
  const touchStartX = useRef(null);

  const handleTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
  };

  const handleTouchEnd = (event) => {
    const touch = event.changedTouches[0];
    if (touchStartX.current === null || !touch) return;

    const deltaX = touch.clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;

    const direction = deltaX > 0 ? 'right' : 'left';
    onSwipe?.(direction);
  };

  if (!image) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-b from-sky-50 to-indigo-50 rounded-3xl shadow-inner p-6">
        <p className="text-lg text-indigo-600 font-semibold">画像がみつからなかったよ</p>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-full bg-gradient-to-b from-sky-50 to-indigo-50 rounded-3xl shadow-xl overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full flex items-center justify-center p-6">
        <img
          src={image.fullUrl}
          alt={image.title}
          className="max-h-full max-w-full object-contain select-none"
          draggable={false}
        />
      </div>
      <div className="bg-white/80 backdrop-blur-md text-gray-800 p-4 sm:p-5 border-t border-white/60">
        <p className="text-base sm:text-lg font-bold truncate" title={image.title}>
          {image.title}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          作者: <span className="font-semibold text-indigo-700">{image.artist || '不明'}</span>
        </p>
        <p className="text-sm text-gray-600">
          ライセンス: <span className="font-semibold text-indigo-700">{image.license || '不明'}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">出典: {image.source || 'Wikimedia Commons'}</p>
      </div>
    </div>
  );
};

ImageSwiper.propTypes = {
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
  onSwipe: PropTypes.func,
};

export default ImageSwiper;
