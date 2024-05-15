import styles from "./dialog.module.scss";
import Button from "../button/button";
import { useDialog } from "./dialog-provider";

export default function Dialog() {
  const { isOpen, content, closeDialog } = useDialog();

  return (
    <>
      {isOpen && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span>{content}</span>
            <Button onClick={closeDialog}>Ok</Button>
          </div>
        </div>
      )}
    </>
  );
}
