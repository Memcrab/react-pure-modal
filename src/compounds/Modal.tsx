import { useId, useMemo } from "react";
import { ModalContent } from "./Content";
import { ModalBackdrop } from "./Backdrop";
import styles from "./Modal.module.css";
import { ModalFooter } from "./Footer";
import { ModalHeader } from "./Header";
import { ModalClose } from "./Close";
import { ModalContext } from "./ModalContext";
import type { ModalProps } from "./Modal.types";

export default function Modal(props: ModalProps) {
  const hash = useId();
  const modalState = useMemo(() => {
    return {
      isOpen: Boolean(props.isOpen),
      onClose: props.onClose,
      closeOnBackdropClick: Boolean(props.closeOnBackdropClick),
      style: props.style,
    };
  }, [props.isOpen, props.onClose, props.closeOnBackdropClick, props.style]);

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <ModalContext.Provider value={modalState}>
      <ModalBackdrop>
        <div id={`pure-modal-${hash}`} className={styles.pureModal}>
          {props.children}
        </div>
      </ModalBackdrop>
    </ModalContext.Provider>
  );
}

Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Close = ModalClose;
