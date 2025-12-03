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
    <div className="min-h-screen bg-[#FFF8E1] text-[#333333] px-5 py-10 flex items-center justify-center">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white/90 border border-amber-100 shadow-2xl rounded-[28px] px-6 py-8 sm:px-10 sm:py-12 flex flex-col items-center text-center gap-7">
          <div className="space-y-3 sm:space-y-4">
            <p className="inline-flex items-center px-4 py-2 rounded-full bg-[#4FC3F7]/20 text-[#4FC3F7] font-bold shadow-md text-base sm:text-lg">
              こども専用ビューアー
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FFB74D] drop-shadow-sm">
              くるま と でんしゃ ずかん
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              すきな なまえを いれて みてね。おおきなボタンで さがせるよ！
            </p>
          </div>

          <SearchInput onSearch={handleSearch} defaultValue={searchTerm} />

          <div className="w-full max-w-3xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[#333333] mb-4 text-center">みんなが よくみる きょうみワード</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {PRESET_KEYWORDS.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => handlePresetClick(keyword)}
                  className="w-full py-4 sm:py-5 px-4 bg-white/90 border-2 border-[#FFB74D]/70 text-lg sm:text-xl font-extrabold rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-transform focus:outline-none focus:ring-4 focus:ring-[#4FC3F7]/40"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>

          {isLoading && (
            <div className="text-center text-lg sm:text-xl font-semibold text-[#4FC3F7] bg-[#4FC3F7]/10 px-4 py-3 rounded-2xl">
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
    </div>
  );
};

export default SearchScreen;
