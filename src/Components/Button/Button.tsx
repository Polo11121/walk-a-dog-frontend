import { CSSProperties, FormEvent, MouseEventHandler, ReactNode } from "react";
import "./Button.scss";

type ButtonProps = {
  title: string;
  Icon?: ReactNode;
  type: "primary" | "secondary" | "default";
  size: "XL" | "M" | "S" | "L";
  styles?: CSSProperties;
  onClick?: (
    e?: FormEvent<HTMLFormElement>
  ) => void | MouseEventHandler<HTMLButtonElement>;
};

export const Button = ({
  title,
  type,
  size,
  styles,
  onClick,
  Icon,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
      style={styles}
      className={`button button__${type} button--${size}`}
    >
      <>
        {Icon}
        {title}
      </>
    </button>
  );
};