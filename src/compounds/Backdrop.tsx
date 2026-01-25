import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import type { CSSProperties } from "react";
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

type ModalBackdropProps = {
  children?: React.ReactNode;
};

export function ModalBackdrop({ children }: ModalBackdropProps) {
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
        onClose("escape");
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
    onClose?.("backdrop");
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
    const zIndexVar = style?.["--z-index"];
    const zIndexOverride =
      typeof zIndexVar === "number"
        ? zIndexVar
        : typeof zIndexVar === "string"
          ? Number.parseFloat(zIndexVar)
          : Number.NaN;
    const max = Number.isFinite(zIndexOverride)
      ? zIndexOverride
      : getMaximumNodeZIndex(`.${styles.pureModalBackdrop}`);
    if (backdropRef.current) {
      backdropRef.current.style.zIndex = String(max + 1);
    }
  }, [style?.["--z-index"]]);

  return (
    <div
      ref={backdropRef}
      className={styles.pureModalBackdrop}
      onMouseDown={handleBackdropClick}
      aria-modal="true"
      role="dialog"
      style={style as CSSProperties}
    >
      {children}
    </div>
  );
}
