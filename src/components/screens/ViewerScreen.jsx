import React, { useEffect, useMemo, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import AttributionFooter from '../common/AttributionFooter';

const getInitialIndex = (searchResults) => {
  let initialIndex = 0;

  try {
    const storedId = sessionStorage.getItem('viewer:selectedImageId');
    if (storedId && Array.isArray(searchResults)) {
      const foundIndex = searchResults.findIndex((item) => item.id === storedId);
      if (foundIndex >= 0) {
        initialIndex = foundIndex;
      }
    }
  } catch (err) {
    // sessionStorage might be blocked; ignore and fallback to first image
  }

  if (Array.isArray(searchResults) && searchResults.length > 0) {
    initialIndex = Math.min(initialIndex, searchResults.length - 1);
  } else {
    initialIndex = 0;
  }

  return initialIndex;
};

const ViewerScreen = ({ searchResults, handleSetScreen }) => {
  const initialIndex = useMemo(() => getInitialIndex(searchResults), [searchResults]);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    document.body.classList.add('no-scroll');

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  const currentImage = useMemo(() => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) return null;
    return searchResults[currentIndex] || searchResults[0];
  }, [searchResults, currentIndex]);

  const handleBack = () => {
    handleSetScreen('gallery');
  };

  const showEmptyState = !currentImage;

  return (
    <div className="viewer-shell">
      <div className="viewer-backdrop" aria-hidden />

      <header className="viewer-header">
        <button
          type="button"
          onClick={handleBack}
          className="primary-button viewer-back-button"

        >
          ← もどる
        </button>
      </header>


      <div className="viewer-main">
        <div className="viewer-stage">
          {showEmptyState ? (
            <div className="flex flex-col items-center justify-center w-full h-full bg-white/90 text-slate-800 rounded-3xl border border-amber-100 shadow-2xl px-6 py-8">
              <p className="text-5xl mb-3">🖼️</p>
              <p className="text-lg sm:text-xl font-semibold text-[var(--color-accent)]">まだ ひらける しゃしん がないよ</p>
              <p className="text-sm text-gray-600 mt-2">まえの画面にもどって、みたいしゃしんを えらんでね。</p>
            </div>
          ) : (
            <Swiper
              direction="horizontal"
              slidesPerView={1}
              spaceBetween={0}
              centeredSlides={false}
              initialSlide={initialIndex}
              onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
              allowTouchMove
              className="viewer-swiper"
            >
              {searchResults?.map((image) => (
                <SwiperSlide key={image.id}>
                  <div className="viewer-slide">
                    <img
                      src={image.fullUrl}
                      alt={image.title}
                      className="viewer-image select-none"
                      draggable={false}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      <div className="viewer-meta">
        <AttributionFooter image={currentImage} />
      </div>
    </div>
  );
};

export default ViewerScreen;
