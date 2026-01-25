import React, { useMemo } from "react";
import { expect } from "@storybook/jest";
import {
  fireEvent,
  userEvent,
  waitFor,
  within,
} from "@storybook/testing-library";
import Modal from "../src/compounds/Modal";
import { useModalContext } from "../src/compounds/ModalContext";
import "./Modal.stories.module.css";

function useMediaQuery(query) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateMatch);
      return () => mediaQuery.removeEventListener("change", updateMatch);
    }

    mediaQuery.addListener(updateMatch);
    return () => mediaQuery.removeListener(updateMatch);
  }, [query]);

  return matches;
}

function createSpy() {
  const spy = (...args) => {
    spy.calls.push(args);
  };
  spy.calls = [];
  return spy;
}

function getLastCall(spy) {
  return spy.calls[spy.calls.length - 1];
}

function resetSpy(spy) {
  if (!spy || !Array.isArray(spy.calls)) return;
  spy.calls.length = 0;
}

function createTouch(target, position, identifier = 0) {
  const { clientX, clientY } = position;
  if (typeof Touch === "function") {
    return new Touch({
      identifier,
      target,
      clientX,
      clientY,
      pageX: clientX,
      pageY: clientY,
      screenX: clientX,
      screenY: clientY,
      radiusX: 2,
      radiusY: 2,
      rotationAngle: 0,
      force: 0.5,
    });
  }

  return {
    identifier,
    target,
    clientX,
    clientY,
    pageX: clientX,
    pageY: clientY,
    screenX: clientX,
    screenY: clientY,
  };
}

function dispatchTransitionEnd(target) {
  if (!target) return;
  if (typeof TransitionEvent === "function") {
    target.dispatchEvent(
      new TransitionEvent("transitionend", {
        propertyName: "transform",
        bubbles: true,
      }),
    );
    return;
  }
  const fallbackEvent = new Event("transitionend", { bubbles: true });
  Object.defineProperty(fallbackEvent, "propertyName", { value: "transform" });
  target.dispatchEvent(fallbackEvent);
}

function App(props) {
  const [isOpen, setIsOpen] = React.useState(true);
  const [isSecondOpen, setIsSecondOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  const customStyle = useMemo(
    () => {
      const style = {};

      if (props.aspectRatio) {
        style["--aspect-ratio"] = props.aspectRatio;
      }

      if (isMobile && props.mobileBottom) {
        style["--aspect-ratio"] = "auto";
        style["--backdrop-justify-content"] = "flex-end";
        style["--radius-bottom-left"] = "0px";
        style["--radius-bottom-right"] = "0px";
      } else if (isMobile) {
        style["--backdrop-justify-content"] = "center";
      }

      return style;
    },
    [isMobile, props.mobileBottom, props.aspectRatio],
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
        onClose={(trigger) => {
          props.onClose?.(trigger);
          setIsOpen(false);
        }}
        style={customStyle}
        closeOnBackdropClick={props.closeOnBackdropClick}
      >
        {props.handlePositions?.map((position) => (
          <Modal.Handle key={position} position={position} />
        ))}
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
        onClose={(trigger) => {
          props.onSecondClose?.(trigger);
          setIsSecondOpen(false);
        }}
        closeOnBackdropClick={props.closeOnBackdropClick}
      >
        {props.handlePositions?.map((position) => (
          <Modal.Handle key={`secondary-${position}`} position={position} />
        ))}
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

function CustomCloseStory(props) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <div style={{ padding: "24px" }}>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open modal with custom close
      </button>
      <Modal
        isOpen={isOpen}
        onClose={(trigger) => {
          props.onClose?.(trigger);
          setIsOpen(false);
        }}
      >
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

function PortalStory(props) {
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
        onClose={(trigger) => {
          props.onClose?.(trigger);
          setIsOpen(false);
        }}
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

function CssVariablesStory(props) {
  const [isOpen, setIsOpen] = React.useState(true);

  const styledVariables = React.useMemo(
    () => ({
      "--radius-top-left": "24px",
      "--radius-top-right": "24px",
      "--radius-bottom-left": "24px",
      "--radius-bottom-right": "24px",
      "--aspect-ratio": "var(--custom-modal-aspect-ratio)",
      "--backdrop-filter": "blur(8px) saturate(140%)",
      "--backdrop-color": "rgba(10, 23, 38, 0.72)",
      "--backdrop-justify-content":
        "var(--custom-modal-backdrop-justify-content)",
      "--box-shadow":
        "0 18px 60px rgba(0, 0, 0, 0.35), 0 6px 18px rgba(0, 0, 0, 0.22)",
      "--modal-animation": "var(--custom-modal-animation)",
      "--width": "var(--custom-css-modal-width)",
      "--max-height": "var(--custom-modal-max-height)",
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
        onClose={(trigger) => {
          props.onClose?.(trigger);
          setIsOpen(false);
        }}
        closeOnBackdropClick
        style={styledVariables}
      >
        <Modal.Close />
        <Modal.Header align={props.headerAlign}>
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
            properties. Adjust colors, padding, aspect ratio, animation, or the
            backdrop alignment without touching the stylesheet.
          </p>
          <p>
            Tweak the `styledVariables` object to see how the modal responds to
            new values in real time. In this story the animation is only set on
            mobile via a CSS variable, so desktop uses the default animation.
          </p>
          <section style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>How this modal works</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li>
                The backdrop and panel read CSS custom properties from the
                `style` prop.
              </li>
              <li>
                `--backdrop-justify-content` controls vertical alignment inside
                the overlay.
              </li>
              <li>
                `--modal-animation` accepts any animation shorthand and can be
                swapped per breakpoint.
              </li>
              <li>
                Custom keyframes live in your app CSS; the modal does not ship
                them.
              </li>
            </ul>
          </section>
          <section style={{ marginTop: 16 }}>
            <h3 style={{ margin: "0 0 8px" }}>Animation examples</h3>
            <p style={{ margin: "0 0 12px" }}>
              Define keyframes in your own CSS and point
              `--modal-animation` at them. This story uses a mobile sheet
              animation.
            </p>
            <pre>
              {
`
:root {
  --custom-css-modal-width: min(320px, 78vw);
  --custom-modal-backdrop-justify-content: center;
  --custom-modal-max-height: 50vh;
  --custom-modal-aspect-ratio: 16 / 10;
}

@media screen and (max-width: 500px) {
  :root {
    --custom-css-modal-width: 85dvw;
    --custom-modal-backdrop-justify-content: flex-end;
    --custom-modal-aspect-ratio: auto;
    --custom-modal-animation: panelSheetIn 280ms cubic-bezier(0.25, 0.85, 0.35, 1)
      both;
    --custom-modal-max-height: 80dvh;
  }
}

@keyframes panelSheetIn {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`
              }
            </pre>
            <p style={{ margin: "12px 0" }}>
              Another option is a quick fade-in for all breakpoints.
            </p>
            <pre>
              {
`
:root {
  --custom-modal-animation: panelFadeIn 200ms ease-out both;
}

@keyframes panelFadeIn {
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
`
              }
            </pre>
          </section>
        </Modal.Content>
        <Modal.Footer align={props.footerAlign}>
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
    onClose: {
      action: "onClose",
      description: "Called when the primary modal closes.",
    },
    onSecondClose: {
      action: "onSecondClose",
      description: "Called when the second modal closes.",
    },
    aspectRatio: {
      options: ["auto", "1 / 1", "4 / 3", "9 / 16"],
      mapping: {
        auto: undefined,
        "1 / 1": "1 / 1",
        "4 / 3": "4 / 3",
        "9 / 16": "9 / 16",
      },
      labels: {
        auto: "auto",
        "1 / 1": "1:1",
        "4 / 3": "4:3",
        "9 / 16": "9:16",
      },
      control: { type: "inline-radio" },
      description: "Set the modal aspect ratio on desktop.",
    },
    headerAlign: {
      options: ["start", "center", "end"],
      control: { type: "inline-radio" },
    },
    footerAlign: {
      options: ["start", "center", "end"],
      control: { type: "inline-radio" },
    },
    mobileBottom: {
      control: { type: "boolean" },
      description: "Stick the modal to the bottom on mobile screens.",
    },
    handlePositions: {
      options: ["top", "bottom", "left", "right"],
      control: { type: "check" },
      description: "Render swipe handle bars at the chosen modal edges.",
    },
  },
};

export default meta;

export const Default = {
  args: {
    aspectRatio: "auto",
    header: true,
    largeContent: false,
    footer: true,
    closeIcon: true,
    closeOnBackdropClick: false,
    headerAlign: "center",
    footerAlign: "center",
    mobileBottom: true,
    handlePositions: ["top"],
  },
};

export const CssVariables = {
  name: "CSS Variables",
  render: (args) => <CssVariablesStory {...args} />,
};

export const CustomClose = {
  name: "Custom Close",
  render: (args) => <CustomCloseStory {...args} />,
};

export const Portal = {
  name: "Portal",
  render: (args) => <PortalStory {...args} />,
};

export const DefaultInteractions = {
  name: "Default Interactions",
  args: {
    aspectRatio: "auto",
    header: true,
    largeContent: false,
    footer: true,
    closeIcon: true,
    closeOnBackdropClick: false,
    headerAlign: "center",
    footerAlign: "center",
    mobileBottom: true,
    handlePositions: ["top"],
    onClose: createSpy(),
    onSecondClose: createSpy(),
  },
  play: async ({ canvasElement, args }) => {
    resetSpy(args.onClose);
    resetSpy(args.onSecondClose);

    const canvas = within(canvasElement);
    const openButton = canvas.getByRole("button", {
      name: /open modal with header and large content/i,
    });
    const initialDialog = await canvas.findByRole("dialog");
    const initialDialogQueries = within(initialDialog);

    await userEvent.click(
      initialDialogQueries.getByRole("button", { name: "✕" }),
    );
    await waitFor(() =>
      expect(args.onClose.calls).toContainEqual(["close-button"]),
    );
    await waitFor(() =>
      expect(canvas.queryByRole("dialog")).toBeNull(),
    );

    await userEvent.click(openButton);
    const reopenedDialog = await canvas.findByRole("dialog");
    await userEvent.click(
      within(reopenedDialog).getByRole("button", { name: /open second modal/i }),
    );

    const dialogs = await canvas.findAllByRole("dialog");
    expect(dialogs).toHaveLength(2);
    const topDialog = dialogs[dialogs.length - 1];
    const topDialogQueries = within(topDialog);

    const input = topDialogQueries.getByPlaceholderText(
      /focus me and press esc/i,
    );
    await userEvent.click(input);
    await userEvent.keyboard("{Escape}");
    expect(args.onSecondClose.calls).toHaveLength(0);

    await userEvent.click(
      topDialogQueries.getByRole("heading", {
        name: /second modal with long title/i,
      }),
    );
    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(args.onSecondClose.calls).toContainEqual(["escape"]),
    );
    await waitFor(() => expect(canvas.getAllByRole("dialog")).toHaveLength(1));
    expect(args.onClose.calls).toHaveLength(1);

    const remainingDialog = canvas.getByRole("dialog");
    const swipeHandle = remainingDialog.querySelector(
      '[data-position="top"]',
    );
    if (!swipeHandle) {
      throw new Error("Expected swipe handle to be rendered.");
    }

    const startTouch = createTouch(
      swipeHandle,
      { clientX: 100, clientY: 120 },
      1,
    );
    const moveTouch = createTouch(
      swipeHandle,
      { clientX: 100, clientY: 520 },
      1,
    );

    fireEvent.touchStart(swipeHandle, {
      touches: [startTouch],
      targetTouches: [startTouch],
      changedTouches: [startTouch],
    });
    fireEvent.touchMove(swipeHandle, {
      touches: [moveTouch],
      targetTouches: [moveTouch],
      changedTouches: [moveTouch],
    });
    fireEvent.touchEnd(swipeHandle, {
      touches: [],
      targetTouches: [],
      changedTouches: [moveTouch],
    });

    const swipeWrapper = swipeHandle.closest('[data-has-handle="true"]');
    dispatchTransitionEnd(swipeWrapper);

    await waitFor(() =>
      expect(getLastCall(args.onClose)).toEqual(["swipe"]),
    );
    await waitFor(() =>
      expect(canvas.queryByRole("dialog")).toBeNull(),
    );
  },
};

export const CustomCloseInteractions = {
  name: "Custom Close Interactions",
  args: {
    onClose: createSpy(),
  },
  render: (args) => <CustomCloseStory {...args} />,
  play: async ({ canvasElement, args }) => {
    resetSpy(args.onClose);

    const canvas = within(canvasElement);
    const dialog = await canvas.findByRole("dialog");

    await userEvent.click(
      within(dialog).getByRole("button", { name: /save & close/i }),
    );
    await waitFor(() => expect(args.onClose.calls).toHaveLength(1));
    expect(args.onClose.calls[0]).toEqual([]);
    await waitFor(() =>
      expect(canvas.queryByRole("dialog")).toBeNull(),
    );
  },
};

export const PortalInteractions = {
  name: "Portal Interactions",
  args: {
    onClose: createSpy(),
  },
  render: (args) => <PortalStory {...args} />,
  play: async ({ args }) => {
    resetSpy(args.onClose);

    await waitFor(() =>
      expect(
        document.querySelector('[data-modal-portal="true"]'),
      ).not.toBeNull(),
    );

    const portalNode = document.querySelector('[data-modal-portal="true"]');
    if (!portalNode) {
      throw new Error("Expected portal node to be mounted.");
    }

    const portalQueries = within(portalNode);
    const dialog = await portalQueries.findByRole("dialog");

    await userEvent.click(
      portalQueries.getByText(/this modal is rendered into a dedicated dom node/i),
    );
    expect(args.onClose.calls).toHaveLength(0);

    await userEvent.click(dialog);
    await waitFor(() =>
      expect(getLastCall(args.onClose)).toEqual(["backdrop"]),
    );
  },
};
