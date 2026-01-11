import type { ReactElement } from "react";
import type { ModalBackdrop } from "./Backdrop";
import type { ModalClose } from "./Close";
import type { ModalContent } from "./Content";
import type { ModalFooter } from "./Footer";
import type { ModalHeader } from "./Header";

export type ModalCompoundElement =
  | ReactElement<typeof ModalBackdrop>
  | ReactElement<typeof ModalClose>
  | ReactElement<typeof ModalHeader>
  | ReactElement<typeof ModalContent>
  | ReactElement<typeof ModalFooter>;

export type ModalChildren = ModalCompoundElement | ModalCompoundElement[];

export type ModalProps = {
  children: ModalChildren;
  isOpen?: boolean;
  // backdrop?: boolean;
  // className?: string;
  // draggable?: boolean;
  // width?: string;
  style?: React.CSSProperties;
  onClose?: VoidFunction;
  closeOnBackdropClick?: boolean;
  // closeButton?: JSX.Element | string;
};
