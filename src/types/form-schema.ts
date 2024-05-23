export type FormSchema<T> = {
  formConfig: FormConfig[];
  initialValues: T;
  validationSchema: any;
  onSubmit?: (key: any) => any;
  onClick?: () => void;
};

export type FormConfig = {
  name: string;
  control: Control;
  inputType: InputType;
  label?: string;
  id?: string
};

export type Control = "input";
export type InputType = "text" | "email" | "number" | "password";
