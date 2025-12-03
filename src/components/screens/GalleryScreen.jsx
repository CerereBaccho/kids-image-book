import React from 'react';

const formatTitle = (title) => {
  if (!title) return '';
  const withoutExtension = title.replace(/\.[^./]+$/, '');
  return withoutExtension.replace(/[_-]+/g, ' ').trim();
};

const GalleryScreen = ({ searchResults, searchTerm, isLoading, handleSetScreen }) => {

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
    <div className="app-background">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="app-card px-4 py-3 sm:px-5 sm:py-4 shadow-lg">
            <p className="text-sm text-gray-600">けんさくワード</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#FF7043]">{searchTerm || '???'}</h1>
          </div>
          <button
            type="button"
            onClick={handleBackToSearch}
            className="self-start secondary-button"
          >
            ← もういちど さがす
          </button>
        </div>

        {isLoading && (
          <div className="status-card text-[var(--color-secondary)] text-lg mb-6">
            いま さがしているよ…
          </div>
        )}

        {hasResults ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {searchResults.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => handleSelectImage(image)}
                className="group relative overflow-hidden rounded-[20px] sm:rounded-[24px] bg-white/95 shadow-lg border border-amber-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-primary)]/40 transition transform active:scale-[0.98] hover:-translate-y-1 flex flex-col"
              >
                <div className="px-3 pt-3 sm:px-4 sm:pt-4">
                  <img
                    src={image.thumbUrl}
                    alt={image.title}
                    className="result-thumb transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 sm:p-4 text-left flex-1 w-full">
                  <p className="text-sm sm:text-base font-bold text-[var(--color-text)] line-clamp-1">{formatTitle(image.title)}</p>
                  <p className="text-xs text-gray-500 mt-1">タップしてひらく</p>
                </div>
                <div className="absolute inset-0 rounded-[24px] ring-0 group-active:ring-4 ring-[#4FC3F7]/30 transition" aria-hidden />
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <div className="status-card max-w-md w-full flex flex-col items-center gap-2 text-[var(--color-text)]">
              <p className="text-4xl">🔍</p>
              <p className="text-lg sm:text-xl font-semibold">まだ けんさくけっか がないよ</p>
              <p className="text-sm sm:text-base max-w-md">
                "しんかんせん" や "どうぶつ" など すきなもの をいれて さがしてみてね。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryScreen;
