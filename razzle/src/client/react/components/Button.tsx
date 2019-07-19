import classNames from 'classnames';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fill?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'danger' | 'success' | 'disabled';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  fill,
  size = 'md',
  variant = 'primary',
  ...props
}) => (
  <button
    className={classNames(`btn btn-${size}`, {
      [`btn-${variant}`]: true,
      'btn-disabled': props.disabled,
      [`btn-${variant}-fill`]: fill && !props.disabled
    })}
    {...props}
  >
    {children}
  </button>
);
