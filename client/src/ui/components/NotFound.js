import React from 'react';
import Header from './_common/Header';


const NotFound = () => (
  // eslint-disable-next-line
  <div className="NotFound">
    <Header
      size="large"
      heading="404 Page not found"
    />
    <a style={{ color: 'blue', fontWeight: '400', margin: '0' }} href="/talk">
      Return to home
    </a>
  </div>
);

export default NotFound;
