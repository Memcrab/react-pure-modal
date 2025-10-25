import { createContext, useContext, useId, useMemo } from "react";
import { ModalContent } from "./ModalContent";
import { ModalBackdrop } from "./ModalBackdrop";
import styles from "./Modal.module.css";
import { ModalFooter } from "./ModalFooter";
import { ModalHeader } from "./ModalHeader";

// components
// import PureModalContent from './pure-modal-content';

// styles
// import "./react-pure-modal.css";

type Props = {
  children: React.ReactNode;
  isOpen?: boolean;
  // backdrop?: boolean;
  // replace?: boolean;
  // className?: string;
  // header?: JSX.Element | string;
  // footer?: JSX.Element | string;
  // scrollable?: boolean;
  // draggable?: boolean;
  // width?: string;
  // onClose?: Function;
  // closeButton?: JSX.Element | string;
  // closeButtonPosition?: string;
  // portal?: boolean;
};

export type ModalContextType = {
  isOpen?: boolean;
};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function useModalContext(): ModalContextType {
  const ctx = useContext(ModalContext);
  return (ctx ?? {}) as ModalContextType;
}

export function Modal(props: Props) {
  const hash = useId();
  const modalState = useMemo(() => {
    return { isOpen: Boolean(props.isOpen) };
  }, [props.isOpen]);

  if (!modalState.isOpen) {
    return null;
  }

  return (
    <ModalContext.Provider value={modalState}>
      <ModalBackdrop>
        <div id={hash} className={styles.pureModal}>
          {props.children}
        </div>
      </ModalBackdrop>
    </ModalContext.Provider>
  );
}

Modal.Footer = ModalFooter;
Modal.Header = ModalHeader;
Modal.Backdrop = ModalBackdrop;
Modal.Content = ModalContent;
