import React, { useMemo } from "react";
import Modal from "../src/compounds/Modal";
import { useModalContext } from "../src/compounds/ModalContext";
import "./Modal.stories.module.css";

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
          <Modal.Header align={props.headerAlign}>
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
        {props.footer && (
          <Modal.Footer align={props.footerAlign}>footer content</Modal.Footer>
        )}
      </Modal>
      <Modal
        isOpen={isSecondOpen}
        onClose={() => {
          setIsSecondOpen(false);
        }}
        closeOnBackdropClick={props.closeOnBackdropClick}
      >
        <Modal.Close />
        <Modal.Header align={props.headerAlign}>
          <h2>Second Modal with long title</h2>
        </Modal.Header>
        <Modal.Content>
          <h1>some main content</h1>
          <p>some content here</p>
          <input type="text" placeholder="Focus me and press ESC" />
        </Modal.Content>
        <Modal.Footer align={props.footerAlign}>footer content</Modal.Footer>
      </Modal>
    </div>
  );
}

function CustomCloseContent() {
  const { onClose } = useModalContext();
  return (
    <button type="button" onClick={() => onClose?.()}>
      Save & Close
    </button>
  );
}

function CustomCloseStory() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div style={{ padding: "24px" }}>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal with custom close
      </button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Close>
          <CustomCloseContent />
        </Modal.Close>
        <Modal.Header>
          <h2>Custom Close</h2>
        </Modal.Header>
        <Modal.Content>
          <p>Custom close content uses modal context to call onClose.</p>
        </Modal.Content>
      </Modal>
    </div>
  );
}

function PortalStory() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [portalNode, setPortalNode] = React.useState(null);

  React.useEffect(() => {
    const node = document.createElement("div");
    node.setAttribute("data-modal-portal", "true");
    document.body.appendChild(node);
    setPortalNode(node);
    setIsOpen(true);

    return () => {
      document.body.removeChild(node);
    };
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal rendered in a portal
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnBackdropClick
        portal={portalNode}
      >
        <Modal.Close />
        <Modal.Header>
          <h2>Portal Modal</h2>
        </Modal.Header>
        <Modal.Content>
          <p>This modal is rendered into a dedicated DOM node.</p>
        </Modal.Content>
      </Modal>
    </div>
  );
}

function CssVariablesStory() {
  const [isOpen, setIsOpen] = React.useState(true);

  const styledVariables = React.useMemo(
    () => ({
      "--radius": "24px",
      "--aspect-ratio": "16 / 10",
      "--backdrop-filter": "blur(8px) saturate(140%)",
      "--backdrop-color": "rgba(10, 23, 38, 0.72)",
      "--box-shadow":
        "0 18px 60px rgba(0, 0, 0, 0.35), 0 6px 18px rgba(0, 0, 0, 0.22)",
      "--width": "var(--custom-css-modal-width)",
      "--max-height": "50vh",
      "--close-button-container-transform": "translate(25px, -25px)",
      "--background": "linear-gradient(160deg, #111827 0%, #0b1220 100%)",
      "--background-panels": "rgba(17, 24, 39, 0.8)",
      "--header-background": "rgba(17, 24, 39, 0.95)",
      "--footer-background": "rgba(15, 23, 42, 0.95)",
      "--z-index": "1200",
      "--top-content-padding": "22px",
      "--bottom-content-padding": "24px",
      "--close-button-background": "rgba(17, 24, 39, 0.8)",
      "--close-button-border": "1px solid rgba(226, 232, 240, 0.7)",
      "--close-button-hover-transform": "translateY(-1px) scale(1.08)",
      "--top-header-padding": "18px",
      "--bottom-header-padding": "12px",
      "--top-footer-padding": "16px",
      "--bottom-footer-padding": "18px",
      "--left-padding": "28px",
      "--right-padding": "28px",
      "--dividers-color": "rgba(148, 163, 184, 0.55)",
      "--dividers-border": "1px solid rgba(148, 163, 184, 0.45)",
    }),
    [],
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 20%, #0b1220, #050a12 60%)",
        color: "#e5e7eb",
        padding: "24px",
      }}
    >
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal styled via CSS variables
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        closeOnBackdropClick
        style={styledVariables}
      >
        <Modal.Close />
        <Modal.Header>
          <div>
            <p
              style={{
                margin: 0,
                letterSpacing: 1,
                textTransform: "uppercase",
                fontSize: 12,
              }}
            >
              Live CSS Variables
            </p>
            <h2 style={{ margin: "4px 0 0" }}>Tailored surface</h2>
          </div>
        </Modal.Header>
        <Modal.Content>
          <p style={{ marginTop: 0 }}>
            Every visual token here comes from the `style` prop using CSS custom
            properties. Adjust colors, padding, aspect ratio, or the
            backdrop blend without touching the stylesheet.
          </p>
          <p>
            Tweak the `styledVariables` object to see how the modal responds to
            new values in real time.
          </p>
          <pre>
            {
`
:root {
  --custom-css-modal-width: min(320px, 78vw);
}

@media screen and (max-width: 500px) {
  :root {
    --custom-css-modal-width: 85dvw;
  }
}
`
            }
          </pre>
        </Modal.Content>
        <Modal.Footer>
          <button type="button" onClick={() => setIsOpen(false)}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const meta = {
  title: "Modal/Default",
  component: App,
  argTypes: {
    headerAlign: {
      options: ["start", "center", "end"],
      control: { type: "inline-radio" },
    },
    footerAlign: {
      options: ["start", "center", "end"],
      control: { type: "inline-radio" },
    },
  },
};

export default meta;

export const Default = {
  args: {
    header: true,
    largeContent: true,
    footer: true,
    closeIcon: true,
    closeOnBackdropClick: true,
    headerAlign: "start",
    footerAlign: "start",
  },
};

export const CssVariables = {
  name: "CSS Variables",
  render: () => <CssVariablesStory />,
};

export const CustomClose = {
  name: "Custom Close",
  render: () => <CustomCloseStory />,
};

export const Portal = {
  name: "Portal",
  render: () => <PortalStory />,
};
