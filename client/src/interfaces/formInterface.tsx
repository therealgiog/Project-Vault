export interface Form {
  firstName?: string;
  secondName?: string;
  email: string;
  password: string;
}

export const initialFormState = {
  firstName: undefined,
  secondName: undefined,
  email: '',
  password: ''
}
