import { useCallback, useEffect, useMemo, useRef } from "react";
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

export function ModalBackdrop({ children }: { children?: React.ReactNode }) {
  const { isOpen, onClose, closeOnBackdropClick } = useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);

  const handleEsc = useCallback(
    (event: KeyboardEvent) => {
      const currentZindexNode = getNodeZIndex(backdropRef.current);
      const maximumZindex = getMaximumNodeZIndex(
        `.${styles.pureModalBackdrop}`,
      );

      if (
        onClose &&
        event.key === "Escape" &&
        currentZindexNode === maximumZindex &&
        document.activeElement
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

  const backdropStyles = useMemo(() => {
    // TODO Problem that components isn't mounted yet to get correct zIndex
    const max = getMaximumNodeZIndex(`.${styles.pureModalBackdrop}`);
    return {
      // TODO add here passing css variables from Modal props
      ...(max ? { zIndex: max + 1 } : {}),
    };
  }, []);
  console.log({ backdropStyles });

  return (
    <div
      ref={backdropRef}
      className={styles.pureModalBackdrop}
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      style={backdropStyles}
    >
      {children}
    </div>
  );
}
