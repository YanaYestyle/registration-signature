"use client";
import { ReactNode, useEffect, useState } from "react";
import "./form-login.scss";
import Form from "../form/form";
import { useFormContext } from "@/app/login/form-data-provider";
import { useAppSelector } from "@/app/hooks/store-hook";
import { useDialog } from "../dialog/dialog-provider";

export default function FormLogin({ children }: { children?: ReactNode[] }) {
  const user = useAppSelector((state) => state.user);
  const { openDialog } = useDialog();

  const getPrismElement = () => {
    return document.querySelector<HTMLDivElement>(".prism-wrapper");
  };

  const transformPrism = (transformValue: string) => {
    const prism = getPrismElement();
    if (prism) {
      prism.style.transform = transformValue;
    }
  };

  useEffect(() => {
    getPrismElement();
  }, []);

  const showThankYou = () => {
    transformPrism("translateZ(-100px) rotateX(90deg)");
  };

  const showSignUp = () => {
    transformPrism("translateZ(-100px) rotateY(-90deg)");
  };

  const showSignIn = () => {
    transformPrism("translateZ(-100px)");
  };

  const showForgotPassword = () => {
    transformPrism("translateZ(-100px) rotateY(-180deg)");
  };

  const formContext = useFormContext();

  if (user.user?.valid) {
    showThankYou();
  }

  return (
    <>
      <div className="form-login-wrapper">
        <div className="prism-wrapper">
          <div className="face face-top"></div>
          <div className="face face-front">
            <div className="form-login-content">
              {children &&
                children.map((child, index) => (
                  <div key={index}>{index === 0 && child}</div>
                ))}
              <h2 className="title-text">
                Or <br /> Sign in to manage your journey
              </h2>
              <Form
                formSchema={{
                  ...formContext.formSchemaSignIn,
                  onClick: () => {
                    if (user.user.valid === false)
                      openDialog("Incorrect password or login. Try again");
                  },
                }}
              ></Form>
              <div className="help-message">
                <span onClick={showForgotPassword}>Forgot password?</span>
                <span onClick={showSignUp}>Not a user? Sign up</span>
              </div>
            </div>
          </div>
          <div className="face face-back">
            <div className="form-login-content">
              <h2 className="title-text">Forgot your password?</h2>
              <div className="help-message">
                <span>
                  Please enter your email so we can send you a reset link for
                  your password
                </span>
              </div>
              <Form
                formSchema={{
                  ...formContext.formSchemaForgetPassword,
                  onClick: () => {
                    formContext.formSchemaForgetPassword.onClick &&
                      formContext.formSchemaForgetPassword.onClick();
                    showThankYou();
                  },
                }}
              ></Form>
            </div>
          </div>
          <div className="face face-right">
            <div className="form-login-content">
              <h2 className="title-text">
                The perfect trip is waiting!
                <br />
                Sign up to start
              </h2>
              <Form
                formSchema={{
                  ...formContext.formSchemaSignUp,
                  onClick: () => {
                    formContext.formSchemaSignUp.onClick &&
                      formContext.formSchemaSignUp.onClick();
                    showThankYou();
                  },
                }}
              ></Form>
              <div className="help-message">
                <span onClick={showSignIn}>Already a user? Sign in</span>
              </div>
            </div>
          </div>
          <div className="face face-left"></div>
          <div className="face face-bottom">
            <div className="thank-you-msg">
              Thank you!
              {children &&
                children.map((child, index) => (
                  <span key={index}>{index === 1 && child}</span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
