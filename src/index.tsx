import Modal from "./compounds/Modal";
import { ModalContext, useModalContext } from "./compounds/ModalContext";

export default Modal;
export { ModalContext, useModalContext };

export type {
  ModalCompoundElement,
  ModalProps,
  ModalCssVariable,
  ModalSectionAlign,
  ModalSwipeDirection,
} from "./compounds/Modal.types";
export type { ModalContextType } from "./compounds/ModalContext";
