import React, { use } from "react";
import styles from "./Close.module.css";
import { useModalContext } from "./ModalContext";

type ModalCloseProps = {
  children?: React.ReactNode;
};

export function ModalClose({ children }: ModalCloseProps) {
  const { onClose } = use(useModalContext);
  return (
    <div className={styles.pureCloseButton}>
      {children || <div className={styles.pureCloseButtonIcon}>✕</div>}
    </div>
  );
}
