import styles from "./Close.module.css";
import { useModalContext } from "./ModalContext";

type ModalCloseProps = {
  children?: React.ReactNode;
};

export function ModalClose({ children }: ModalCloseProps) {
  const { onClose } = useModalContext();
  return (
    <div className={styles.pureCloseButton}>
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
