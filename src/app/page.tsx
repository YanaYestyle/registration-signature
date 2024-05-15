"use client";
import styles from "./page.module.scss";
import Login from "./login/page";
import { Provider } from "react-redux";
import store from "./store/store";
import Loader from "@/components/loader/loader";
import { DialogProvider } from "@/components/dialog/dialog-provider";
import ErrorMessage from "@/components/error/error";

export default function Home() {
  return (
    <Provider store={store}>
      <DialogProvider>
        <div className={styles.main}>
          <Loader />
          <ErrorMessage />
          <Login />
        </div>
      </DialogProvider>
    </Provider>
  );
}
