import Modal from "react-pure-modal";

const handleClose = () => true;

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

// @ts-expect-error Modal children must be compound components.
const InvalidChildren = <Modal isOpen>Just text</Modal>;

// @ts-expect-error onClose must be a function.
const InvalidOnClose = <Modal isOpen onClose="nope"><Modal.Close /></Modal>;

// @ts-expect-error position must be one of the supported values.
const InvalidHandlePosition = <Modal.Handle position="center" />;

// @ts-expect-error id must be a string.
const InvalidId = <Modal id={123}><Modal.Close /></Modal>;

void ValidModal;
void InvalidChildren;
void InvalidOnClose;
void InvalidHandlePosition;
void InvalidId;
