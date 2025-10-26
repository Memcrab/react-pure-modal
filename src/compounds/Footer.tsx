import styles from "./Modal.module.css";

type ModalFooterProps = {
  children?: React.ReactNode;
};

export function ModalFooter({ children }: ModalFooterProps) {
  return <div className={styles.pureModalFooter}>{children}</div>;
}
