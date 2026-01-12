import styles from "./Modal.module.css";
import { useModalContext } from "./ModalContext";

type ModalCloseProps = {
  children?: React.ReactNode;
};

export function ModalClose({ children }: ModalCloseProps) {
  const { onClose } = useModalContext();
  return (
    <div className={styles.pureCloseButton}>
      {/* TODO Should I choose function as component or just export modal context and allow to use onClose */}
      {children || (
        <button
          type="button"
          onClick={onClose}
          className={styles.pureCloseButtonIcon}
        >
          ✕
        </button>
      )}
    </div>
  );
}
