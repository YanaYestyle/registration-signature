import errorStyle from "./input-error-message.module.scss";

export default function InputErrorMessage(props: string) {
  return <div className={errorStyle.error}>{props}</div>;
}
