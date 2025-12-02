import React from 'react';

const LoadingIndicator = ({ label = 'よみこみちゅう… すこしまってね' }) => {
  return (
    <div className="flex flex-col items-center gap-4 text-center text-sky-700" role="status" aria-live="polite">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-8 border-amber-300 opacity-60" />
        <div className="absolute inset-1 rounded-full border-8 border-pink-400 border-t-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full border-8 border-sky-400 border-r-transparent animate-[spin_2s_linear_infinite]" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-r from-teal-400 via-amber-300 to-rose-400 animate-pulse shadow-lg" />
      </div>
      <div className="space-y-1">
        <p className="text-xl font-bold drop-shadow">{label}</p>
        <p className="text-sm text-amber-600">カラフルなまるがくるくるまわっているよ</p>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default LoadingIndicator;
