import React from "react";
import styles from "./Backdrop.module.css";

export function ModalBackdrop({ children }: { children?: React.ReactNode }) {
  return <div className={styles.pureModalBackdrop}>{children}</div>;
}
