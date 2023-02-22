import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <div className="book-block-wrapper">
    <ContentLoader
      className="book-block"
      speed={2}
      width={280}
      height={500}
      viewBox="0 0 280 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="136" cy="136" r="120" />
      <rect x="0" y="290" rx="10" ry="10" width="280" height="32" />
      <rect x="0" y="336" rx="10" ry="10" width="280" height="88" />
      <rect x="0" y="440" rx="10" ry="10" width="96" height="30" />
      <rect x="120" y="440" rx="20" ry="20" width="160" height="40" />
    </ContentLoader>
  </div>
);

export default Skeleton;
