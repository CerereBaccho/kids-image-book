import PropTypes from 'prop-types';
import React from 'react';

const PwaShell = ({ children }) => {
  return (
    <div className="min-h-screen font-kosugi-maru bg-gradient-to-b from-sky-50 via-white to-orange-50 text-gray-900">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
};

PwaShell.propTypes = {
  children: PropTypes.node,
};

export default PwaShell;
