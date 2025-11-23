import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type { MouseOrTouch } from "../../@types/types";
import styles from "./Modal.module.css";
import { useModalContext } from "./ModalContext";

function getNodeZIndex(node: Element | null): number {
  if (!node) return -99999;
  const z = Number.parseInt(getComputedStyle(node).zIndex || "0", 10);
  return Number.isNaN(z) ? -99999 : z;
}

function getMaximumNodeZIndex(selector: string): number {
  const maximumZindex = Math.max(
    ...Array.from(document.querySelectorAll(selector)).map((backdropNode) =>
      getNodeZIndex(backdropNode),
    ),
  );
  return Math.max(maximumZindex, 1);
}

function isTypingElement(el: Element | null): boolean {
  if (!el) return false;

  const tag = el.tagName.toLowerCase();

  if (tag === "input" || tag === "textarea" || tag === "select") {
    return true;
  }

  // contenteditable element
  if ((el as HTMLElement).isContentEditable) {
    return true;
  }

  return false;
}

export function ModalBackdrop({ children }: { children?: React.ReactNode }) {
  const { isOpen, onClose, style, closeOnBackdropClick } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      if (isTypingElement(document.activeElement)) {
        return;
      }

      const currentZindexNode = getNodeZIndex(backdropRef.current);
      const maximumZindex = getMaximumNodeZIndex(
        `.${styles.pureModalBackdrop}`,
      );

      if (
        onClose &&
        event.key === "Escape" &&
        currentZindexNode === maximumZindex
      ) {
        onClose();
        return true;
      }

      return false;
    },
    [onClose],
  );

  const handleBackdropClick = (event: MouseOrTouch) => {
    if (!closeOnBackdropClick) return;

    if (event) {
      if (
        !(event.target as Element).classList.contains(styles.pureModalBackdrop)
      ) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
    }
    onClose?.();
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, handleEsc]);

  useLayoutEffect(() => {
    const max = getMaximumNodeZIndex(`.${styles.pureModalBackdrop}`);
    if (backdropRef.current) {
      // TODO Or just get from props if passed
      backdropRef.current.style.zIndex = String(max + 1);
    }
  }, []);

  return (
    <div
      ref={backdropRef}
      className={styles.pureModalBackdrop}
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      style={style}
    >
      {children}
    </div>
  );
}
