import React from 'react';
import useAppState from '../../hooks/useAppState';

const formatTitle = (title) => {
  if (!title) return '';
  const withoutExtension = title.replace(/\.[^./]+$/, '');
  return withoutExtension.replace(/[_-]+/g, ' ').trim();
};

const GalleryScreen = () => {
  const { searchResults, searchTerm, isLoading, handleSetScreen } = useAppState();

  const handleSelectImage = (image) => {
    try {
      sessionStorage.setItem('viewer:selectedImageId', image.id);
    } catch (err) {
      // sessionStorage might be unavailable; fail silently to keep navigation smooth
    }
    handleSetScreen('viewer');
  };

  const handleBackToSearch = () => {
    handleSetScreen('search');
  };

  const hasResults = Array.isArray(searchResults) && searchResults.length > 0;

  return (
    <div className="min-h-screen bg-[#FFF8E1] text-[#333333]">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="bg-white/80 border border-amber-100 rounded-2xl px-4 py-3 shadow-md">
            <p className="text-sm text-gray-600">けんさくワード</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FF7043]">{searchTerm || '???'}</h1>
          </div>
          <button
            type="button"
            onClick={handleBackToSearch}
            className="self-start inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#4FC3F7] text-white font-extrabold shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]/40"
          >
            ← もういちど さがす
          </button>
        </div>

        {isLoading && (
          <div className="text-center text-lg font-semibold text-[#4FC3F7] mb-6">さがしているよ…</div>
        )}

        {hasResults ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-7">
            {searchResults.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => handleSelectImage(image)}
                className="group relative overflow-hidden rounded-[24px] bg-white/90 shadow-lg border border-amber-200 focus:outline-none focus:ring-4 focus:ring-[#FFB74D]/40 transition transform active:scale-[0.98] hover:-translate-y-1"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-white to-amber-50">
                  <img
                    src={image.thumbUrl}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-4 text-left">
                  <p className="text-sm sm:text-base font-bold text-[#333333] line-clamp-2">{formatTitle(image.title)}</p>
                  <p className="text-xs text-gray-500 mt-1">タップしてひらく</p>
                </div>
                <div className="absolute inset-0 rounded-[24px] ring-0 group-active:ring-4 ring-[#4FC3F7]/30 transition" aria-hidden />
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-3 text-center text-gray-600">
            <p className="text-4xl">🔍</p>
            <p className="text-lg sm:text-xl font-semibold">まだ けんさくけっか がないよ</p>
            <p className="text-sm sm:text-base max-w-md">"しんかんせん" や "どうぶつ" など すきなもの をいれて さがしてみてね。</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryScreen;
