import { createContext, useContext, useEffect, useState } from "react";
import { FormConfig, FormSchema } from "@/types/form-schema";
import * as Yup from "yup";
import { useAppDispatch } from "../hooks/store-hook";
import { fetchUser } from "./get-user";
import { useDialog } from "@/components/dialog/dialog-provider";
import { createUser } from "./new-user";

const formConfigSignIn: FormConfig[] = [
  {
    name: "login",
    control: "input",
    inputType: "text",
    id: "loginSignIn",
  },
  {
    name: "password",
    control: "input",
    inputType: "password",
    id: "passwordSignIn",
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
};

const formConfigSignUp: FormConfig[] = [
  {
    name: "email",
    control: "input",
    inputType: "email",
    id: "emailSignUp",
  },
  {
    name: "password",
    control: "input",
    inputType: "password",
    id: "passwordSignUp",
  },
  {
    name: "repeatPassword",
    control: "input",
    inputType: "password",
    label: "repeat password",
    id: "repeatPasswordSignUp",
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
};

const formConfigForgetPassword: FormConfig[] = [
  {
    name: "email",
    control: "input",
    inputType: "email",
    id: "emailForgetPassword",
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
};

const defaultFormSchema = {
  formSchemaForgetPassword,
  formSchemaSignIn,
  formSchemaSignUp,
};

const FormContext = createContext(defaultFormSchema);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [defaultForm, setNewForm] = useState(defaultFormSchema);
  const dispatch = useAppDispatch();
  const { openDialog } = useDialog();

  useEffect(() => {
    setNewForm({
      ...defaultForm,
      formSchemaForgetPassword: {
        ...formSchemaForgetPassword,
      },
      formSchemaSignIn: {
        ...formSchemaSignIn,
        onSubmit: (values) => {
          dispatch(fetchUser(values)).then((user) => {
            if (user.payload.valid === false)
              openDialog("Incorrect password or login. Try again");
          });
        },
      },
      formSchemaSignUp: {
        ...formSchemaSignUp,
        onSubmit: (values) => {
          dispatch(createUser(values))
            .then((user: any) => {
              if (!user.payload)
                openDialog("Incorrect password or login. Try again");
            })
            .catch((error) => console.log(error));
        },
      },
    });
  }, []);

  return (
    <FormContext.Provider value={defaultForm}>{children}</FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
