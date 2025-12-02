import React from 'react';
import SearchInput from '../gallery/SearchInput';
import useAppState from '../../hooks/useAppState';

const PRESET_KEYWORDS = [
  'しんかんせん',
  'くるま',
  'でんしゃ',
  'どうぶつ',
  'ひこうき',
  'うみ',
  'きょうりゅう',
];

const SearchScreen = () => {
  const { searchTerm, isLoading, error, handleSearch } = useAppState();

  const handlePresetClick = (keyword) => {
    handleSearch(keyword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-amber-100 text-gray-800 px-4 py-10 sm:py-14">
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="inline-flex items-center px-4 py-2 rounded-full bg-amber-200 text-amber-800 font-semibold shadow-md text-sm sm:text-base">
            こども専用ビューアー
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-sky-700 drop-shadow-sm">
            すきなものを さがして みよう！
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            きょうは なにが みたい？ キーワードを いれてね。えいご でも にほんご でも だいじょうぶ！
          </p>
        </div>

        <SearchInput onSearch={handleSearch} defaultValue={searchTerm} />

        <div className="w-full max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4 text-center">
            みんなが よくみる きょうみワード
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {PRESET_KEYWORDS.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handlePresetClick(keyword)}
                className="w-full py-4 sm:py-5 px-4 bg-white border-2 border-amber-300 text-lg sm:text-xl font-bold rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-4 focus:ring-amber-200"
              >
                {keyword}
              </button>
            ))}
          </div>
        </div>

        {isLoading && (
          <div className="text-center text-lg sm:text-xl font-semibold text-sky-600 animate-pulse">
            いま さがしているよ…
          </div>
        )}

        {error && (
          <div className="w-full max-w-xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl shadow-sm text-center font-semibold">
            うまく ひらけなかったよ。 もういちど ためしてね。
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchScreen;
