import React from "react";
import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "secondary" | "success" | "danger";
  children?: ReactNode;
}

export default function Button({
  color = "primary",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = `btn btn-${color} ${className}`;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
