"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { FormConfig, FormSchema } from "@/types/form-schema";
import * as Yup from "yup";

const formConfigSignIn: FormConfig[] = [
  {
    name: "login",
    control: "input",
    inputType: "text",
  },
  {
    name: "password",
    control: "input",
    inputType: "password",
  },
];

const initialValuesSignIn = {
  login: "",
  password: "",
};

const formSchemaSignIn: FormSchema<Object> = {
  initialValues: initialValuesSignIn,
  formConfig: formConfigSignIn,
  validationSchema: Yup.object({
    password: Yup.string().required("Password is required"),
    login: Yup.string()
      .email("Invalid email format")
      .required("Login is required"),
  }),
  onSubmit: (values) => console.log(values),
  onClick: () => console.log("ok"),
};

const formConfigSignUp: FormConfig[] = [
  {
    name: "email",
    control: "input",
    inputType: "email",
  },
  {
    name: "password",
    control: "input",
    inputType: "password",
  },
  {
    name: "repeatPassword",
    control: "input",
    inputType: "password",
    label: "repeat password",
  },
];

const initialValuesSignUp = {
  email: "",
  password: "",
  repeatPassword: "",
};

const formSchemaSignUp: FormSchema<Object> = {
  initialValues: initialValuesSignUp,
  formConfig: formConfigSignUp,
  validationSchema: Yup.object({
    password: Yup.string().required("Password is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Login is required"),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Passwords have to match")
      .required("Please repeat your password"),
  }),
  onSubmit: (values) => console.log(values),
  onClick: () => console.log("values"),
};

const formConfigForgetPassword: FormConfig[] = [
  {
    name: "email",
    control: "input",
    inputType: "email",
  },
];

const initialValuesForgetPassword = {
  email: "",
};

const formSchemaForgetPassword: FormSchema<Object> = {
  initialValues: initialValuesForgetPassword,
  formConfig: formConfigForgetPassword,
  validationSchema: Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Login is required"),
  }),
  onSubmit: (values) => console.log(values),
  onClick: () => console.log("values"),
};

const defaultFormSchema = {
  formSchemaForgetPassword,
  formSchemaSignIn,
  formSchemaSignUp,
};

const FormContext = createContext(defaultFormSchema);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  //TODO: To refactor
  /*const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    fetchDataFromAPI().then((data) => {
      setTheme({
        ...defaultTheme,
        formSchemaForgetPassword: {
          ...formSchemaForgetPassword,
          onClick: () => {
            // Your logic here using the fetched data
            showThankYou();
          },
        },
        formSchemaSignIn: {
          ...formSchemaSignIn,
        },
        formSchemaSignUp: {
          ...formSchemaSignUp,
        },
      });
    });
  }, []);*/

  return (
    <FormContext.Provider value={defaultFormSchema}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
