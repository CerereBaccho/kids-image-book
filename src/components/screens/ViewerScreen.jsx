import React, { useEffect, useMemo, useState } from 'react';
import ImageSwiper from '../gallery/ImageSwiper';
import AttributionFooter from '../common/AttributionFooter';
import useAppState from '../../hooks/useAppState';

const ViewerScreen = () => {
  const { searchResults, handleSetScreen } = useAppState();
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
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-100 via-white to-amber-100 text-gray-900">
      <div className="absolute top-6 left-6 z-20">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 border-2 border-indigo-200 text-indigo-700 text-lg font-extrabold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-200"
        >
          ← もどる
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full px-4 pt-20 pb-28">
        <div className="w-full max-w-5xl aspect-[4/5] sm:aspect-[3/4] md:aspect-video">
          {showEmptyState ? (
            <div className="flex flex-col items-center justify-center w-full h-full bg-white/70 rounded-3xl border border-indigo-100 shadow-inner">
              <p className="text-5xl mb-3">🖼️</p>
              <p className="text-lg sm:text-xl font-semibold text-indigo-700">まだ ひらける しゃしん がないよ</p>
              <p className="text-sm text-gray-600 mt-2">まえの画面にもどって、みたいしゃしんを えらんでね。</p>
            </div>
          ) : (
            <ImageSwiper image={currentImage} onSwipe={handleSwipe} />
          )}
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-10">
        <AttributionFooter image={currentImage} />
      </div>
    </div>
  );
};

export default ViewerScreen;
