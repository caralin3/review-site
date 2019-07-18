import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'danger' | 'success';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size = 'md',
  variant = 'primary'
}) => (
  <button className={`btn btn-${size} btn-${variant}`} onClick={onClick}>
    {children}
  </button>
);
