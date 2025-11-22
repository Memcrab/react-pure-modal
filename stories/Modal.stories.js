import React from "react";
import { Modal } from "../src/compounds/Modal";

function App() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Close />
        <Modal.Content>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
        </Modal.Content>
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
