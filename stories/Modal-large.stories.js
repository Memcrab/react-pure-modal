import React from "react";
import { Modal } from "../src/compounds/Modal";

function App(props) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal with header and large content
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        {props.closeIcon && <Modal.Close />}
        {props.header && (
          <Modal.Header>
            <h2>header content</h2>
          </Modal.Header>
        )}
        <Modal.Content>
          <h1>some main content</h1>
          <p>some content here</p>
          {props.largeContent && (
            <>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                nec arcu ut arcu pulvinar viverra. Interdum et malesuada fames
                ac ante ipsum primis in faucibus. Sed blandit lacus sit amet
                tortor pulvinar aliquam. Aenean feugiat, risus in posuere
                auctor, ex nisi rhoncus metus, id efficitur leo enim at tellus.
                Praesent interdum nunc quam. Nulla tempus blandit eros, vel
                interdum mauris interdum nec. Cras suscipit ante dictum neque
                cursus auctor. Pellentesque et massa pharetra, hendrerit arcu
                at, faucibus neque. Donec a velit placerat, lobortis turpis id,
                feugiat ante. Vivamus sollicitudin pharetra fermentum. Donec
                rhoncus dui a odio congue, ut consectetur turpis ullamcorper.
                Sed orci dolor, consequat eget viverra quis, tempor non tortor.
                Nunc vel urna et tortor hendrerit facilisis. Vestibulum volutpat
                sapien ut dictum commodo.
              </p>
              <p>
                Aenean molestie in nulla in euismod. Mauris accumsan nulla ut
                eros venenatis, in faucibus libero sodales. Nunc aliquet diam
                odio, eget iaculis mauris blandit eget. Integer non facilisis
                sem. Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Pellentesque feugiat commodo
                ligula a hendrerit. Curabitur porta nisi nec tristique
                scelerisque. Interdum et malesuada fames ac ante ipsum primis in
                faucibus. Suspendisse tempus aliquet dolor, ac accumsan dolor
                mattis id. Nam metus ante, sodales et metus vel, scelerisque
                faucibus ligula. Phasellus pretium molestie tellus ut aliquet.
                Vestibulum fringilla dolor nec leo bibendum, quis rutrum diam
                vehicula. Nulla sodales ligula diam, sit amet commodo urna
                vehicula eu. Aenean dictum mattis luctus. Nulla viverra, ipsum
                at vestibulum mattis, libero lectus imperdiet felis, ultrices
                cursus metus felis et neque.
              </p>
            </>
          )}
        </Modal.Content>
        {props.footer && <Modal.Footer>footer content</Modal.Footer>}
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
  args: {
    header: true,
    largeContent: true,
    footer: true,
    closeIcon: true,
  },
};
