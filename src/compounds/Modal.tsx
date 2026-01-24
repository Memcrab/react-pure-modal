import { Children, isValidElement, useId, useMemo } from "react";
import { createPortal } from "react-dom";
import { ModalContent } from "./Content";
import { ModalBackdrop } from "./Backdrop";
import styles from "./Modal.module.css";
import { ModalFooter } from "./Footer";
import { ModalHeader } from "./Header";
import { ModalClose } from "./Close";
import { ModalHandle } from "./Handle";
import { ModalContext } from "./ModalContext";
import type { ModalProps } from "./Modal.types";

export default function Modal(props: ModalProps) {
  const fallbackId = useId();
  const hash = props.id ?? fallbackId;
  const { handleNodes, modalNodes } = (() => {
    const handles: React.ReactNode[] = [];
    const content: React.ReactNode[] = [];

    for (const child of Children.toArray(props.children)) {
      if (isValidElement(child) && child.type === ModalHandle) {
        handles.push(child);
        continue;
      }
      content.push(child);
    }

    return { handleNodes: handles, modalNodes: content };
  })();
  const modalState = useMemo(() => {
    return {
      isOpen: Boolean(props.isOpen),
      onClose: props.onClose,
      closeOnBackdropClick: Boolean(props.closeOnBackdropClick),
      style: props.style,
    };
  }, [
    props.isOpen,
    props.onClose,
    props.closeOnBackdropClick,
    props.style,
  ]);

  if (!modalState.isOpen) {
    return null;
  }

  const modalNode = (
    <ModalContext.Provider value={modalState}>
      <ModalBackdrop>
        {handleNodes}
        <div
          id={`pure-modal-${hash}`}
          className={styles.pureModal}
        >
          {modalNodes}
        </div>
      </ModalBackdrop>
    </ModalContext.Provider>
  );

  if (props.portal !== undefined) {
    if (typeof document === "undefined") {
      return null;
    }
    if (!props.portal) {
      return null;
    }
    return createPortal(modalNode, props.portal);
  }

  return modalNode;
}

Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Close = ModalClose;
Modal.Handle = ModalHandle;
