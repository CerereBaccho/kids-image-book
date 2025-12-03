import React, { useMemo } from 'react';

const ErrorScreen = ({ searchTerm, error, isLoading, handleSearch, handleSetScreen }) => {

  const headline = useMemo(() => {
    const raw = error?.message || '';
    const normalized = raw.toLowerCase();

    if (normalized.includes('ng word') || normalized.includes('not allowed')) {
      return 'そのことばは つかえないよ';
    }

    if (normalized.includes('network') || normalized.includes('failed')) {
      return 'つながらなかったみたい…';
    }

    return 'ごめんね、うまく ひらけなかったよ';
  }, [error]);

  const detail = useMemo(() => {
    if (!error?.message) {
      return 'もういちどためしたり、ちょっとだけ まってみてね。';
    }
    return error.message;
  }, [error]);

  const handleRetry = () => {
    if (isLoading) return;

    if (searchTerm?.trim()) {
      handleSearch(searchTerm);
    } else {
      handleSetScreen('search');
    }
  };

  const handleBack = () => {
    handleSetScreen('search');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-100 via-white to-sky-100 text-gray-900 px-5 py-10 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/90 border border-rose-100 rounded-3xl shadow-2xl p-8 sm:p-10 text-center space-y-6">
        <div className="text-5xl sm:text-6xl">🥺</div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-rose-500 drop-shadow-sm">{headline}</h1>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            {detail || 'もういちどためしたり、ちょっとだけ まってみてね。'}
          </p>
        </div>

        {searchTerm ? (
          <p className="text-sm sm:text-base text-gray-600">
            いまは <span className="font-semibold text-gray-800">{searchTerm}</span> をさがしているよ。
          </p>
        ) : (
          <p className="text-sm sm:text-base text-gray-600">なにをさがすか えらんでみよう！</p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4">
          <button
            type="button"
            onClick={handleRetry}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-amber-400 hover:bg-amber-500 text-white text-lg font-bold rounded-full shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            もういちど ためす
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-white text-rose-500 text-lg font-bold rounded-full border-2 border-rose-200 shadow-sm hover:shadow-md"
          >
            さがす 画面にもどる
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
