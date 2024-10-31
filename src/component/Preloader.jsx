import React from 'react';

const Preloader = ({ loading }) => {
  return (
    <div id="js-preloader" className={`js-preloader ${loading ? '' : 'loaded'}`}>
      <div className="preloader-inner">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
