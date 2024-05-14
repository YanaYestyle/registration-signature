import { Field, ErrorMessage } from "formik";
import InputErrorMessage from "../input-error-message/input-error-message";
import input from "./input.module.scss";

export default function Input(props: {
  label?: string;
  name?: string;
  errorMessage?: string;
  id?: string;
}) {
  const { label, name, id, errorMessage, ...rest } = props;
  return (
    <>
      <div className={input.wrapper}>
        <Field
          className={input.input}
          placeholder={name}
          id={id}
          name={name}
          {...rest}
        />
        <label className={input.label} htmlFor={id}>
          {label}
        </label>
      </div>
      <ErrorMessage children={InputErrorMessage} name={name ? name : ""} />
    </>
  );
}
