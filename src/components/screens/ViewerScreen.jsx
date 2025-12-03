import React, { useEffect, useMemo, useState } from 'react';
import ImageSwiper from '../gallery/ImageSwiper';
import AttributionFooter from '../common/AttributionFooter';

const ViewerScreen = ({ searchResults, handleSetScreen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
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

    setCurrentIndex(initialIndex);
  }, [searchResults]);

  const currentImage = useMemo(() => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) return null;
    return searchResults[currentIndex] || searchResults[0];
  }, [searchResults, currentIndex]);

  const handleSwipe = (direction) => {
    if (!Array.isArray(searchResults) || searchResults.length === 0) return;

    if (direction === 'left' && currentIndex < searchResults.length - 1) {
      setCurrentIndex((prev) => Math.min(prev + 1, searchResults.length - 1));
    }

    if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleBack = () => {
    handleSetScreen('gallery');
  };

  const showEmptyState = !currentImage;

  return (
    <div className="viewer-overlay text-white">
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="fixed top-5 left-5 z-20">
        <button
          type="button"
          onClick={handleBack}
          className="primary-button bg-[var(--color-accent)] text-white text-lg"
        >
          ← もどる
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full px-4 pt-20 pb-32 relative z-10">
        <div className="w-full max-w-5xl flex items-center justify-center">
          <div className="w-full flex items-center justify-center bg-white/5 border border-white/10 rounded-[28px] shadow-2xl p-4 sm:p-6">
            {showEmptyState ? (
              <div className="flex flex-col items-center justify-center w-full h-full bg-white/90 text-slate-800 rounded-3xl border border-amber-100 shadow-2xl px-6 py-8">
                <p className="text-5xl mb-3">🖼️</p>
                <p className="text-lg sm:text-xl font-semibold text-[var(--color-accent)]">まだ ひらける しゃしん がないよ</p>
                <p className="text-sm text-gray-600 mt-2">まえの画面にもどって、みたいしゃしんを えらんでね。</p>
              </div>
            ) : (
              <div className="relative w-full">
                <ImageSwiper image={currentImage} onSwipe={handleSwipe} />
                <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-white/70 text-3xl sm:text-4xl font-bold">◀</div>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-white/70 text-3xl sm:text-4xl font-bold justify-end">▶</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-20">
        <AttributionFooter image={currentImage} />
      </div>
    </div>
  );
};

export default ViewerScreen;
