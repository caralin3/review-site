import React from 'react';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  classes?: string;
}

export const Form: React.FC<FormProps> = ({
  children,
  classes,
  onSubmit,
  ...props
}) => (
  <form
    className={`form ${classes}`}
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

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  classes?: string;
}

export const TextInput: React.FC<TextInputProps> = ({ classes, ...props }) => (
  <input className={`form__input ${classes}`} type="text" {...props} />
);

export interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  classes?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ classes, ...props }) => (
  <textarea
    className={`form__input form__input-textArea ${classes}`}
    {...props}
  />
);

export const EmailInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => <input className="form__input" type="email" {...props} />;

export const PasswordInput: React.FC<
  React.InputHTMLAttributes<HTMLInputElement>
> = ({ ...props }) => (
  <input className="form__input" type="password" {...props} />
);

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

export interface SelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  classes?: string;
  options: { value: string; label: string }[];
}

export const SelectInput: React.FC<SelectInputProps> = ({
  classes,
  options,
  ...props
}) => (
  <select className={`form__input form__input-select ${classes}`} {...props}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
