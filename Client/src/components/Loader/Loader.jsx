import React from 'react';
import './loader.css'

const Loader = ({ isLoading }) => {
  return (
    <div className="loader-container loader-overlay">
      {isLoading && (
        <div className="loader">
        </div>
      )}
    </div>
  );
};

export default Loader;