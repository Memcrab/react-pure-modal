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
import type { ModalHandlePosition, ModalProps } from "./Modal.types";

export default function Modal(props: ModalProps) {
  const fallbackId = useId();
  const hash = props.id ?? fallbackId;
  const { handleNodes, modalNodes, hasHeader, hasFooter, handlePositions } =
    (() => {
      const handles: React.ReactElement<{ position: ModalHandlePosition }>[] =
        [];
      const content: React.ReactNode[] = [];
      let header = false;
      let footer = false;
      const positions: Record<ModalHandlePosition, boolean> = {
        top: false,
        bottom: false,
        left: false,
        right: false,
      };

      for (const child of Children.toArray(props.children)) {
        if (!isValidElement(child)) {
          content.push(child);
          continue;
        }

        const childType = child.type;
        if (childType === ModalHandle) {
          const handleElement =
            child as React.ReactElement<{ position: ModalHandlePosition }>;
          handles.push(handleElement);
          positions[handleElement.props.position] = true;
          continue;
        }
        if (childType === ModalHeader) {
          header = true;
        }
        if (childType === ModalFooter) {
          footer = true;
        }
        content.push(child);
      }

      return {
        handleNodes: handles,
        modalNodes: content,
        hasHeader: header,
        hasFooter: footer,
        handlePositions: positions,
      };
    })();
  const hasHandle = Object.values(handlePositions).some(Boolean);
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
        <div
          className={styles.pureModalSwipeWrapper}
          data-has-handle={hasHandle ? "true" : "false"}
          data-handle-top={handlePositions.top ? "true" : "false"}
          data-handle-bottom={handlePositions.bottom ? "true" : "false"}
          data-handle-left={handlePositions.left ? "true" : "false"}
          data-handle-right={handlePositions.right ? "true" : "false"}
        >
          {handleNodes}
          <div
            id={`pure-modal-${hash}`}
            className={styles.pureModal}
            data-has-header={hasHeader ? "true" : "false"}
            data-has-footer={hasFooter ? "true" : "false"}
          >
            {modalNodes}
          </div>
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
