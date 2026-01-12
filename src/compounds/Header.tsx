import styles from "./Modal.module.css";
import type { ModalSectionAlign } from "./Modal.types";

type ModalHeaderProps = {
  align?: ModalSectionAlign;
  children?: React.ReactNode;
};

export function ModalHeader({ align, children }: ModalHeaderProps) {
  return (
    <div className={styles.pureModalHeader} data-align={align}>
      {children}
    </div>
  );
}
