import React from "react";
import { Modal } from "../src/compounds/Modal";

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      <Modal isOpen={true} backdrop>
        <Modal.Header>header content</Modal.Header>
        <Modal.Content>
          <h1>some main content</h1>
          <p>some content here</p>
          <p>some content here</p>
          {/* <div
            style={{
              position: "fixed",
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              background: "rgba(255,0,0,0.2)",
            }}
          >
            fixed div
          </div> */}
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
          <p>some content here</p>
        </Modal.Content>
        <Modal.Footer>footer content</Modal.Footer>
      </Modal>
    </div>
  );
}

const meta = {
  title: "Example/Modal Large",
  component: App,
};

export default meta;

export const Primary = {
  args: {},
};
