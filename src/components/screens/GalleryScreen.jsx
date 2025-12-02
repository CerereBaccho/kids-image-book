import React from 'react';
import useAppState from '../../hooks/useAppState';

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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-sky-50 text-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">けんさくワード</p>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-sky-700">{searchTerm || '???'}</h1>
          </div>
          <button
            type="button"
            onClick={handleBackToSearch}
            className="self-start inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-sky-200 text-sky-700 font-semibold shadow-sm hover:shadow-md transition"
          >
            もういちど さがす
          </button>
        </div>

        {isLoading && (
          <div className="text-center text-lg font-semibold text-sky-600 mb-6">さがしているよ…</div>
        )}

        {hasResults ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {searchResults.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => handleSelectImage(image)}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg border border-amber-100 focus:outline-none focus:ring-4 focus:ring-amber-200"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50">
                  <img
                    src={image.thumbUrl}
                    alt={image.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 text-left">
                  <p className="text-sm font-bold text-gray-800 line-clamp-2">{image.title}</p>
                  <p className="text-xs text-gray-500 mt-1">タップしてひらく</p>
                </div>
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
