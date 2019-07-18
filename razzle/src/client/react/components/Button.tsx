import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'danger' | 'success' | 'disabled';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  size = 'md',
  variant = 'primary',
  ...props
}) => (
  <button
    className={`btn btn-${size} ${
      props.disabled ? 'btn-disabled' : `btn-${variant}`
    }`}
    {...props}
  >
    {children}
  </button>
);
