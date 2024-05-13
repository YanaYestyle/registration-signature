import styles from "./page.module.scss";
import Login from "./login/page";

export default function Home() {
  return (
    <div className={styles.main}>
      <Login></Login>
    </div>
  );
}
