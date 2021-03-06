import classNames from 'classnames';
import React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  classes?: string;
  fill?: boolean;
  selected?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'danger' | 'success' | 'disabled';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  classes,
  fill,
  selected,
  size = 'md',
  variant = 'primary',
  ...props
}) => (
  <button
    className={classNames(`btn btn-${size} ${classes}`, {
      [`btn-${variant}`]: true,
      'btn-disabled': props.disabled,
      [`btn-${variant}-fill`]: fill && !props.disabled,
      [`btn-${variant}-selected`]: selected && !props.disabled
    })}
    {...props}
  >
    {children}
    {props.disabled && '  '}
    {props.disabled && <i className="fas fa-circle-notch fa-spin" />}
  </button>
);
