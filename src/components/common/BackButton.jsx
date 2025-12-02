import PropTypes from 'prop-types';
import React from 'react';

const BackButton = ({ onClick, ariaLabel = 'もどる' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-300 via-pink-400 to-sky-400 shadow-lg shadow-sky-200 hover:shadow-xl active:scale-95 transition-transform duration-150 focus:outline-none focus:ring-4 focus:ring-pink-200"
    >
      <span className="sr-only">{ariaLabel}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8 text-white drop-shadow"
        aria-hidden
      >
        <path d="M15 18l-6-6 6-6" />
        <path d="M9 12h10" />
      </svg>
    </button>
  );
};

BackButton.propTypes = {
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
};

export default BackButton;
