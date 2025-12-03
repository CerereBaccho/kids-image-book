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
    <div className="app-background px-5 py-10 flex items-center justify-center">
      <div className="max-w-2xl w-full app-card p-8 sm:p-10 text-center space-y-6">
        <div className="text-5xl sm:text-6xl">🥺</div>
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-accent)] drop-shadow-sm">{headline}</h1>
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
            className="primary-button w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-4 text-lg"
          >
            もういちど ためす
          </button>
          <button
            type="button"
            onClick={handleBack}
            className="secondary-button w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-4 text-lg"
          >
            さがす 画面にもどる
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorScreen;
