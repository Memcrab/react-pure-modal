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

export type ModalCssVariable =
  | "--radius"
  | "--aspect-ratio"
  | "--backdrop-color"
  | "--box-shadow"
  | "--max-width"
  | "--max-height"
  | "--min-width"
  | "--background"
  | "--background-panels"
  | "--z-index"
  | "--top-content-padding"
  | "--bottom-content-padding"
  | "--top-header-padding"
  | "--bottom-header-padding"
  | "--top-footer-padding"
  | "--bottom-footer-padding"
  | "--left-padding"
  | "--base-right-padding"
  | "--right-padding"
  | "--close-button-background"
  | "--close-button-size"
  | "--close-button-hit-padding"
  | "--close-button-space"
  | "--contrast-color"
  | "--dividers-color"
  | "--border"
  | "--backdrop-filter";

export type ModalStyle = Partial<Record<ModalCssVariable, string | number>>;

export type ModalProps = {
  children: ModalChildren;
  isOpen?: boolean;
  // backdrop?: boolean;
  // className?: string;
  // draggable?: boolean;
  // width?: string;
  style?: ModalStyle;
  onClose?: VoidFunction;
  closeOnBackdropClick?: boolean;
  // closeButton?: JSX.Element | string;
};
