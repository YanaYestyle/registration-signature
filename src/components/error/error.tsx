"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./error.module.scss";
import Button from "../button/button";

export default function ErrorMessage() {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const requestInterceptor = axios.interceptors.request.use(
      (config) => {
        setError(null);
        return config;
      },
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        setError(error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  const handleClose = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <span>{error.message}</span>
            <Button onClick={handleClose}>Ok</Button>
          </div>
        </div>
      )}
    </div>
  );
}
