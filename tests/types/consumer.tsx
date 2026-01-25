import Modal, { useModalContext } from "react-pure-modal";
import type { ModalCloseTrigger } from "react-pure-modal";

const handleClose = (trigger?: ModalCloseTrigger) => {
  if (trigger === "escape") {
    return true;
  }
  return true;
};

function CustomCloseContent() {
  const { onClose } = useModalContext();
  return (
    <button type="button" onClick={() => onClose?.("close-button")}>
      Close
    </button>
  );
}

function InvalidCloseContent() {
  const { onClose } = useModalContext();
  // @ts-expect-error onClose trigger must be a supported string.
  onClose?.("nope");
  return null;
}

const ValidModal = (
  <Modal
    id="custom-id"
    isOpen
    onClose={handleClose}
    closeOnBackdropClick
    style={{
      "--z-index": 10,
      "--backdrop-justify-content": "flex-end",
      "--modal-animation": "panelSoftPop 240ms ease both",
      "--radius-top-left": "12px",
      "--radius-top-right": "12px",
      "--radius-bottom-right": "0px",
      "--radius-bottom-left": "0px",
      "--swipe-handle-gap": "6px",
    }}
  >
    <Modal.Handle position="top" />
    <Modal.Close />
    <Modal.Header align="center">Header</Modal.Header>
    <Modal.Content>Content</Modal.Content>
    <Modal.Footer align="end">Footer</Modal.Footer>
  </Modal>
);

const ValidModalWithoutHeaderFooter = (
  <Modal isOpen onClose={handleClose}>
    <Modal.Content>Content only</Modal.Content>
  </Modal>
);

const ValidModalWithHandles = (
  <Modal isOpen onClose={handleClose}>
    <Modal.Handle position="left" />
    <Modal.Handle position="right" />
    <Modal.Content>Content</Modal.Content>
  </Modal>
);

const ValidModalWithBottomHandle = (
  <Modal isOpen onClose={handleClose}>
    <Modal.Handle position="bottom" />
    <Modal.Content>Content</Modal.Content>
  </Modal>
);

const ValidModalWithCustomClose = (
  <Modal isOpen onClose={handleClose}>
    <Modal.Close>
      <CustomCloseContent />
    </Modal.Close>
    <Modal.Content>Content</Modal.Content>
  </Modal>
);

const ValidModalArrayChildren = (
  <Modal isOpen onClose={handleClose}>
    {[
      <Modal.Header key="header">Header</Modal.Header>,
      <Modal.Content key="content">Content</Modal.Content>,
      null,
    ]}
  </Modal>
);

// @ts-expect-error Modal children must be compound components.
const InvalidChildren = <Modal isOpen>Just text</Modal>;

// @ts-expect-error onClose must be a function.
const InvalidOnClose = <Modal isOpen onClose="nope"><Modal.Close /></Modal>;

// @ts-expect-error position must be one of the supported values.
const InvalidHandlePosition = <Modal.Handle position="center" />;

// @ts-expect-error id must be a string.
const InvalidId = <Modal id={123}><Modal.Close /></Modal>;

void ValidModal;
void ValidModalWithoutHeaderFooter;
void ValidModalWithHandles;
void ValidModalWithBottomHandle;
void ValidModalWithCustomClose;
void ValidModalArrayChildren;
void CustomCloseContent;
void InvalidCloseContent;
void InvalidChildren;
void InvalidOnClose;
void InvalidHandlePosition;
void InvalidId;
