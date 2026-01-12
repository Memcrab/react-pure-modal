import styles from "./Modal.module.css";
import type { ModalSectionAlign } from "./Modal.types";

type ModalFooterProps = {
  align?: ModalSectionAlign;
  children?: React.ReactNode;
};

export function ModalFooter({ align, children }: ModalFooterProps) {
  return (
    <div className={styles.pureModalFooter} data-align={align}>
      {children}
    </div>
  );
}
