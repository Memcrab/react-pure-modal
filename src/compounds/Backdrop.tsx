import { MouseOrTouch } from "../../@types/types";
import styles from "./Backdrop.module.css";
import { useModalContext } from "./ModalContext";

export function ModalBackdrop({ children }: { children?: React.ReactNode }) {
  const { onClose } = useModalContext();
  const handleBackdropClick = (event: MouseOrTouch) => {
    if (event) {
      if (
        !(event.target as Element).classList.contains("pure-modal-backdrop")
      ) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }
    onClose?.();
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: <it's a backdrop that closes the modal on click>
    // biome-ignore lint/a11y/useKeyWithClickEvents: <it's a backdrop that closes the modal on click>
    <div className={styles.pureModalBackdrop} onClick={handleBackdropClick}>
      {children}
    </div>
  );
}
