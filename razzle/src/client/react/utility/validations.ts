export interface Validation {
  valid: boolean;
  errorMessage: string;
}

export const getValidation = (validation: Validation[], submit: boolean) => {
  const result = validation.filter(res => !res.valid);
  if (submit && result && result.length > 0) {
    const errors: string[] = result.map(res => res.errorMessage);
    return { errors, valid: false };
  }
  return { valid: true, errors: [] };
};

export const isValid = (validation: Validation[]) => {
  const result = validation.filter(res => !res.valid);
  if (result && result.length > 0) {
    return false;
  }
  return true;
};

// A validation to validate arbitrary length
export const minLength = (value: any, length: number, message?: string) => ({
  valid: (value || '').length >= length,
  errorMessage: message || `Must be at least ${length} characters long`
});

export const minPassword = (value: any, length: number, message?: string) => ({
  valid: value ? value.length >= length : true,
  errorMessage: message || `Must be at least ${length} characters long`
});

// A validation to validate arbitrary RegExp for a match
export const match = (value: any, match: RegExp, message?: string) => ({
  valid: !!match.exec(value),
  errorMessage: message || `Must contain ${match}`
});

// Custom validations
export const validateRequired = (value: any) => [
  minLength(value, 1, 'Required Field')
];

// Custom username validations
export const validateUsername = (value: any) => [
  minLength(value, 1, 'Required Field'),
  match(value, /^[^.]*$/, 'Cannot contain period')
];

// Custom email validations
export const validateEmail = (value: any) => [
  match(value, /@/, 'Must contain @ symbol'),
  match(value, /@.+\.[A-Za-z]{2,}$/, 'Must end with a domain')
];

// Custom password validations
export const validatePassword = (value: any) => [minLength(value, 5)];

export const validateResetPassword = (value: any) => [minPassword(value, 5)];
