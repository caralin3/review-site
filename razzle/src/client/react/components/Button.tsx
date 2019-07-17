import React from 'react';

export interface ButtonProps {
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
  text: string;
  variant: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  size,
  text,
  variant
}) => (
  <button className={`btn-${variant}`} onClick={onClick}>
    {text}
  </button>
);
