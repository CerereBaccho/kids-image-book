import React from 'react';
import SearchInput from '../gallery/SearchInput';

const PRESET_KEYWORDS = [
  'しんかんせん',
  'くるま',
  'でんしゃ',
  'どうぶつ',
  'ひこうき',
  'うみ',
  'きょうりゅう',
];

const SearchScreen = ({ searchTerm, isLoading, error, handleSearch }) => {

  const handlePresetClick = (keyword) => {
    handleSearch(keyword);
  };

  return (
    <div className="app-background px-5 py-12 sm:py-16 flex items-start justify-center">
      <div className="w-full max-w-[600px] mx-auto">
        <div className="app-card px-8 sm:px-10 py-10 sm:py-12 flex flex-col items-stretch text-center gap-10 shadow-2xl">
          <div className="space-y-4 sm:space-y-5">
            <p className="inline-flex items-center px-5 py-2 rounded-full bg-[var(--color-secondary)]/25 text-[var(--color-secondary)] font-bold shadow-md text-base sm:text-lg">
              こども専用ビューアー
            </p>
            <h1 className="text-[34px] sm:text-[40px] leading-tight font-extrabold text-[var(--color-primary)] drop-shadow-sm">
              くるま と でんしゃ ずかん
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              すきな なまえを いれて みてね。おおきなボタンで さがせるよ！
            </p>
          </div>

          <div className="w-full flex flex-col gap-6">
            <SearchInput onSearch={handleSearch} defaultValue={searchTerm} />

            <div className="w-full max-w-xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-text)] mb-4 text-center">みんなが よくみる きょうみワード</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {PRESET_KEYWORDS.map((keyword) => (
                  <button
                    key={keyword}
                    type="button"
                    onClick={() => handlePresetClick(keyword)}
                    className="soft-chip"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {isLoading && (
            <div className="status-card text-[var(--color-secondary)] text-lg sm:text-xl">
              いま さがしているよ…
            </div>
          )}

          {error && (
            <div className="status-card bg-red-50 border-red-200 text-red-700">
              うまく ひらけなかったよ。 もういちど ためしてね。
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
