import React from 'react';

export interface BannerProps {}

export const Banner: React.FC<BannerProps> = ({ children }) => (
  <div className="banner">
    <i className="fas fa-film banner__icon" />
    <h1 className="banner__brand">reviewer</h1>
    <p className="banner__text">
      Review your favorite movies and tv shows. Start looking for movies and
      shows below.
    </p>
  </div>
);
