import React from "react";
import styles from "./Header.module.css";

type ModalHeaderProps = {
  children?: React.ReactNode;
};

export function ModalHeader({ children }: ModalHeaderProps) {
  return <div className={styles.pureModalHeader}>{children}</div>;
}
