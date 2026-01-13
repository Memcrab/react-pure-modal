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

export type ModalChildren = ModalCompoundElement | ModalCompoundElement[] | null;

export type ModalSectionAlign = "start" | "center" | "end";

export type ModalCssVariable =
  | "--radius"
  | "--aspect-ratio"
  | "--backdrop-color"
  | "--box-shadow"
  | "--width"
  | "--width-mobile"
  | "--max-height"
  | "--background"
  | "--background-panels"
  | "--header-background"
  | "--footer-background"
  | "--z-index"
  | "--top-content-padding"
  | "--bottom-content-padding"
  | "--top-header-padding"
  | "--bottom-header-padding"
  | "--header-left-padding"
  | "--header-right-padding"
  | "--top-footer-padding"
  | "--bottom-footer-padding"
  | "--left-padding"
  | "--right-padding"
  | "--close-button-background"
  | "--close-button-border"
  | "--close-button-size"
  | "--close-button-container-transform"
  | "--close-button-place-self"
  | "--close-button-grid-row"
  | "--close-button-hover-transform"
  | "--dividers-color"
  | "--dividers-border"
  | "--backdrop-filter";

export type ModalStyle = Partial<Record<ModalCssVariable, string | number>>;

export type ModalProps = {
  children: ModalChildren;
  isOpen?: boolean;
  style?: ModalStyle;
  onClose?: VoidFunction;
  closeOnBackdropClick?: boolean;
  portal?: Element | DocumentFragment | null;
};
