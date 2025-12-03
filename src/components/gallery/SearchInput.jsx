import { useMemo, useState } from 'react';

const NG_WORDS = ['adult', 'sex', 'エロ', 'おっぱい'];

const normalize = (value) => value.toLowerCase();

const containsNgWord = (value) => {
  const normalized = normalize(value);
  return NG_WORDS.some((word) => normalized.includes(normalize(word)));
};

const SearchInput = ({ onSearch, defaultValue = '' }) => {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState('');

  const disabled = useMemo(() => !value.trim(), [value]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();

    if (!trimmed) {
      setError('キーワードを入力してね');
      return;
    }

    if (containsNgWord(trimmed)) {
      setError('その言葉は使えないよ。別の言葉で探してみてね！');
      return;
    }

    setError('');
    onSearch?.(trimmed);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 border-2 border-[var(--color-primary)]/70 rounded-full shadow-xl px-2 py-2 sm:px-3 sm:py-3"
      >
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white rounded-full px-4 py-3 sm:py-4 shadow-inner">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="すきなものをさがしてみよう！（例：しんかんせん）"
            className="flex-1 bg-transparent text-lg sm:text-xl text-gray-800 placeholder-gray-400 outline-none"
            aria-label="検索キーワード"
          />
          <button
            type="submit"
            disabled={disabled}
            className="primary-button w-full sm:w-auto px-8 sm:px-7 py-3 sm:py-4 text-lg sm:text-xl"
          >
            さがす
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-3 text-center text-sm sm:text-base text-red-600 font-semibold" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default SearchInput;
