"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./loader.module.scss";

export default function Loader() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setLoading(true);
        return config;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        setLoading(false);
        return response;
      },
      (error) => {
        setLoading(false);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return loading ? (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  ) : null;
}
