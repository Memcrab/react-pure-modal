import React from "react";
import styles from "./ModalContent.module.css";

type ModalContentProps = {
  children?: React.ReactNode;
};

export function ModalContent({ children }: ModalContentProps) {
  return <div className={styles.pureModalContent}>{children}</div>;
}
