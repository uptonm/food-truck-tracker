// This class serves as the footer text for the web application
import React from 'react';

import '../assets/styles/footer.css';

export default () => {
  return (
    <div className="footer">
      <h1 className="footer-text">
        <i className="fal fa-code" /> with <i className="fal fa-heart" /> by
        Jason Saturno & Michael Upton
      </h1>
    </div>
  );
};
