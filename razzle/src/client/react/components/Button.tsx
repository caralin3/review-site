import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size,
  variant
}) => (
  <button className={`btn-${variant}`} onClick={onClick}>
    {children}
  </button>
);
