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
      className="relative w-full h-full bg-gradient-to-b from-slate-800/70 via-slate-900/70 to-slate-950/80 rounded-[28px] shadow-2xl overflow-hidden border border-white/10"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full flex items-center justify-center p-6 sm:p-8">
        <img
          src={image.fullUrl}
          alt={image.title}
          className="viewer-image select-none"
          draggable={false}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent p-4 sm:p-5 text-white">
        <p className="text-sm sm:text-base font-semibold drop-shadow" title={image.title}>
          {image.title}
        </p>
        <p className="text-xs text-white/80">スワイプでつぎのしゃしんへ</p>
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
