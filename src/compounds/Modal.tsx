import { type JSX, useId } from "react";
import { createPortal } from "react-dom";

// components
// import PureModalContent from './pure-modal-content';

// styles
// import "./react-pure-modal.css";

type Props = {
  children: JSX.Element;
  replace?: boolean;
  className?: string;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
  scrollable?: boolean;
  draggable?: boolean;
  width?: string;
  isOpen?: boolean;
  onClose?: Function;
  closeButton?: JSX.Element | string;
  closeButtonPosition?: string;
  portal?: boolean;
};

function PureModal(props: Props) {
  const { portal } = props;
  const hash = useId();

  const modalContent = <div>compounds should be here</div>;

  if (portal) {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
}

export default PureModal;
