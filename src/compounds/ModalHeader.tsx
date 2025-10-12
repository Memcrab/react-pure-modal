import React from "react";
import styles from "./ModalHeader.module.css";

type ModalHeaderProps = {
  children?: React.ReactNode;
};

export function ModalHeader({ children }: ModalHeaderProps) {
  return <div className={styles.pureModalHeader}>{children}</div>;
}
