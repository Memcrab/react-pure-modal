import React from "react";
import styles from "./Close.module.css";

type ModalCloseProps = {
  children?: React.ReactNode;
};

export function ModalClose({ children }: ModalCloseProps) {
  return (
    <div className={styles.pureCloseButton}>
      {children || <div className={styles.pureCloseButtonIcon}>✕</div>}
    </div>
  );
}
