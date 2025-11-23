import React, { useMemo } from "react";
import Modal from "../src/compounds/Modal";

function App(props) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isSecondOpen, setIsSecondOpen] = React.useState(false);

  const customStyle = useMemo(
    () => ({
      "--aspect-ratio": "4 / 3",
    }),
    [],
  );

  return (
    <div className="App">
      <button type="button" onClick={() => setIsOpen(true)}>
        Open Modal with header and large content
      </button>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        arcu ut arcu pulvinar viverra. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Sed blandit lacus sit amet tortor pulvinar aliquam.
        Aenean feugiat, risus in posuere auctor, ex nisi rhoncus metus, id
        efficitur leo enim at tellus. Praesent interdum nunc quam. Nulla tempus
        blandit eros, vel interdum mauris interdum nec. Cras suscipit ante
        dictum neque cursus auctor. Pellentesque et massa pharetra, hendrerit
        arcu at, faucibus neque. Donec a velit placerat, lobortis turpis id,
        feugiat ante. Vivamus sollicitudin pharetra fermentum. Donec rhoncus dui
        a odio congue, ut consectetur turpis ullamcorper. Sed orci dolor,
        consequat eget viverra quis, tempor non tortor. Nunc vel urna et tortor
        hendrerit facilisis. Vestibulum volutpat sapien ut dictum commodo.
      </p>
      <p>
        Aenean molestie in nulla in euismod. Mauris accumsan nulla ut eros
        venenatis, in faucibus libero sodales. Nunc aliquet diam odio, eget
        iaculis mauris blandit eget. Integer non facilisis sem. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Pellentesque feugiat commodo ligula a hendrerit. Curabitur
        porta nisi nec tristique scelerisque. Interdum et malesuada fames ac
        ante ipsum primis in faucibus. Suspendisse tempus aliquet dolor, ac
        accumsan dolor mattis id. Nam metus ante, sodales et metus vel,
        scelerisque faucibus ligula. Phasellus pretium molestie tellus ut
        aliquet. Vestibulum fringilla dolor nec leo bibendum, quis rutrum diam
        vehicula. Nulla sodales ligula diam, sit amet commodo urna vehicula eu.
        Aenean dictum mattis luctus. Nulla viverra, ipsum at vestibulum mattis,
        libero lectus imperdiet felis, ultrices cursus metus felis et neque.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        arcu ut arcu pulvinar viverra. Interdum et malesuada fames ac ante ipsum
        primis in faucibus. Sed blandit lacus sit amet tortor pulvinar aliquam.
        Aenean feugiat, risus in posuere auctor, ex nisi rhoncus metus, id
        efficitur leo enim at tellus. Praesent interdum nunc quam. Nulla tempus
        blandit eros, vel interdum mauris interdum nec. Cras suscipit ante
        dictum neque cursus auctor. Pellentesque et massa pharetra, hendrerit
        arcu at, faucibus neque. Donec a velit placerat, lobortis turpis id,
        feugiat ante. Vivamus sollicitudin pharetra fermentum. Donec rhoncus dui
        a odio congue, ut consectetur turpis ullamcorper. Sed orci dolor,
        consequat eget viverra quis, tempor non tortor. Nunc vel urna et tortor
        hendrerit facilisis. Vestibulum volutpat sapien ut dictum commodo.
      </p>
      <p>
        Aenean molestie in nulla in euismod. Mauris accumsan nulla ut eros
        venenatis, in faucibus libero sodales. Nunc aliquet diam odio, eget
        iaculis mauris blandit eget. Integer non facilisis sem. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Pellentesque feugiat commodo ligula a hendrerit. Curabitur
        porta nisi nec tristique scelerisque. Interdum et malesuada fames ac
        ante ipsum primis in faucibus. Suspendisse tempus aliquet dolor, ac
        accumsan dolor mattis id. Nam metus ante, sodales et metus vel,
        scelerisque faucibus ligula. Phasellus pretium molestie tellus ut
        aliquet. Vestibulum fringilla dolor nec leo bibendum, quis rutrum diam
        vehicula. Nulla sodales ligula diam, sit amet commodo urna vehicula eu.
        Aenean dictum mattis luctus. Nulla viverra, ipsum at vestibulum mattis,
        libero lectus imperdiet felis, ultrices cursus metus felis et neque.
      </p>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        style={customStyle}
        closeOnBackdropClick={props.closeOnBackdropClick}
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
          <button type="button" onClick={() => setIsSecondOpen(true)}>
            Open Second Modal
          </button>
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
      <Modal
        isOpen={isSecondOpen}
        onClose={() => {
          setIsSecondOpen(false);
        }}
        closeOnBackdropClick={props.closeOnBackdropClick}
      >
        <Modal.Close />
        <Modal.Header>
          <h2>Seconds Modal</h2>
        </Modal.Header>
        <Modal.Content>
          <h1>some main content</h1>
          <p>some content here</p>
          <input type="text" placeholder="Focus me and press ESC" />
        </Modal.Content>
        <Modal.Footer>footer content</Modal.Footer>
      </Modal>
    </div>
  );
}

const meta = {
  title: "Modal/Default",
  component: App,
};

export default meta;

export const Default = {
  args: {
    header: true,
    largeContent: true,
    footer: true,
    closeIcon: true,
    closeOnBackdropClick: true,
  },
};
