"use client";
import styles from "./page.module.scss";
import Login from "./login/page";
import { Provider } from "react-redux";
import store from "./store/store";

export default function Home() {
  return (
    <Provider store={store}>
      <div className={styles.main}>
        <Login></Login>
      </div>
    </Provider>
  );
}
