import React from 'react';

export const Form: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  onSubmit,
  ...props
}) => (
  <form
    className="form"
    onSubmit={e => {
      e.preventDefault();
      if (onSubmit) onSubmit(e);
    }}
    {...props}
  >
    {children}
  </form>
);

export interface FormValidationProps {
  errors: string[];
  valid: boolean;
  submit?: boolean;
}

export const FormValidation: React.FC<FormValidationProps> = ({
  children,
  errors,
  valid,
  submit
}) => (
  <div>
    {children}
    <ul className="form__error-messages">
      {submit &&
        !valid &&
        errors.map((error, index) => (
          <li key={index}>
            <small>{error}</small>
          </li>
        ))}
    </ul>
  </div>
);

export const Label: React.FC<React.HTMLProps<HTMLLabelElement>> = ({
  ...props
}) => <label className="form__label" {...props} />;

export const TextInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => <input className="form__input" type="text" {...props} />;

export const SearchInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => (
  <input className="form__input form__input-search" type="search" {...props} />
);

export const NumberInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => (
  <input className="form__input form__input-number" type="number" {...props} />
);
