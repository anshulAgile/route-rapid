// Can vary depending on your BE response
export interface IApiSuccess<T> {
  data: T;
  message?: number;
}
export interface IApiError {
  message?: string;
  status: number;
}

export interface CommonValidatorProps {
  errorMessage?: string;
  validationMessage?: string;
}

export interface PhoneNumberValidatorProps extends CommonValidatorProps {
  value: any;
  numberLength?: number;
}
