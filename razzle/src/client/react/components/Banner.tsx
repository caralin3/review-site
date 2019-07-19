import React from 'react';

export interface BannerProps {}

export const Banner: React.FC<BannerProps> = ({ children }) => (
  <div className="banner">{children}</div>
);
