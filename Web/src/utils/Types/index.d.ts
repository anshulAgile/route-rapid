// Can vary depending on your BE response
export interface IApiSuccess<T>  {
  version: string
  statusCode: number
  message: string
  result: T
}

export interface IApiError {
  version: string
  statusCode: number
  isError: boolean
  responseException: {
    exceptionMessage: string
  }
}

export interface CommonValidatorProps {
  errorMessage?: string;
  validationMessage?: string;
}

export interface PhoneNumberValidatorProps extends CommonValidatorProps {
  value: any;
  numberLength?: number;
}
