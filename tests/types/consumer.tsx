import Modal from "react-pure-modal";

const handleClose = () => true;

const ValidModal = (
  <Modal
    id="custom-id"
    isOpen
    onClose={handleClose}
    closeOnBackdropClick
    style={{ "--z-index": 10 }}
  >
    <Modal.Close />
    <Modal.Header>Header</Modal.Header>
    <Modal.Content>Content</Modal.Content>
    <Modal.Footer>Footer</Modal.Footer>
  </Modal>
);

// @ts-expect-error Modal children must be compound components.
const InvalidChildren = <Modal isOpen>Just text</Modal>;

// @ts-expect-error onClose must be a function.
const InvalidOnClose = <Modal isOpen onClose="nope"><Modal.Close /></Modal>;

// @ts-expect-error id must be a string.
const InvalidId = <Modal id={123}><Modal.Close /></Modal>;

void ValidModal;
void InvalidChildren;
void InvalidOnClose;
void InvalidId;
