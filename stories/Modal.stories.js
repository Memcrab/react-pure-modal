import React from "react";
import { Modal } from "../src/compounds/Modal";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={true}>
        <Modal.Header>header content</Modal.Header>
        <Modal.Content>some content here</Modal.Content>
        <Modal.Footer>footer content</Modal.Footer>
      </Modal>
    </div>
  );
}

const meta = {
  title: "Example/Modal",
  component: App,
};

export default meta;

export const Primary = {
  args: {},
};
