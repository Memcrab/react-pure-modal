import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { MouseOrTouch } from "../../@types/types";
import styles from "./Modal.module.css";
import { useModalContext } from "./ModalContext";
import type { ModalSwipeDirection } from "./Modal.types";

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

const SWIPE_DIRECTION_LOCK_PX = 6;
const SWIPE_CLOSE_MIN_PX = 80;
const SWIPE_CLOSE_RATIO = 0.2;
const SWIPE_OFFSCREEN_MARGIN_PX = 24;

function getSwipeDirection(
  deltaX: number,
  deltaY: number,
): ModalSwipeDirection {
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX >= 0 ? "left-right" : "right-left";
  }
  return deltaY >= 0 ? "up-down" : "down-up";
}

function getSwipeAxis(direction: ModalSwipeDirection): "x" | "y" {
  return direction === "left-right" || direction === "right-left" ? "x" : "y";
}

function getDirectionalDelta(
  direction: ModalSwipeDirection,
  deltaX: number,
  deltaY: number,
): number {
  switch (direction) {
    case "left-right":
      return Math.max(0, deltaX);
    case "right-left":
      return Math.min(0, deltaX);
    case "up-down":
      return Math.max(0, deltaY);
    case "down-up":
      return Math.min(0, deltaY);
  }
}

function getSwipeCloseThreshold(axisSize: number): number {
  const base = Math.round(axisSize * SWIPE_CLOSE_RATIO);
  return Math.max(SWIPE_CLOSE_MIN_PX, base);
}

export function ModalBackdrop({ children }: { children?: React.ReactNode }) {
  const { isOpen, onClose, style, closeOnBackdropClick, swipeToClose } =
    useModalContext();
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const swipeWrapperRef = useRef<HTMLDivElement | null>(null);
  const swipeStateRef = useRef({
    isTracking: false,
    isDragging: false,
    startX: 0,
    startY: 0,
    activeDirection: null as ModalSwipeDirection | null,
    lastTranslateX: 0,
    lastTranslateY: 0,
  });
  const [isSwipeClosing, setIsSwipeClosing] = useState(false);

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

  const isTopmostBackdrop = useCallback((): boolean => {
    const currentZindexNode = getNodeZIndex(backdropRef.current);
    const maximumZindex = getMaximumNodeZIndex(
      `.${styles.pureModalBackdrop}`,
    );
    return currentZindexNode === maximumZindex;
  }, []);

  const setSwipeTranslate = useCallback((x: number, y: number) => {
    const swipeNode = swipeWrapperRef.current;
    if (!swipeNode) return;
    swipeNode.style.setProperty("--modal-swipe-translate-x", `${x}px`);
    swipeNode.style.setProperty("--modal-swipe-translate-y", `${y}px`);
    swipeStateRef.current.lastTranslateX = x;
    swipeStateRef.current.lastTranslateY = y;
  }, []);

  const setSwipeTransitionEnabled = useCallback((enabled: boolean) => {
    const swipeNode = swipeWrapperRef.current;
    if (!swipeNode) return;
    swipeNode.style.transition = enabled ? "" : "none";
  }, []);

  const resetSwipe = useCallback(() => {
    swipeStateRef.current.isTracking = false;
    swipeStateRef.current.isDragging = false;
    swipeStateRef.current.activeDirection = null;
    swipeStateRef.current.startX = 0;
    swipeStateRef.current.startY = 0;
    swipeStateRef.current.lastTranslateX = 0;
    swipeStateRef.current.lastTranslateY = 0;
    setIsSwipeClosing(false);
    setSwipeTransitionEnabled(true);
    setSwipeTranslate(0, 0);
  }, [setSwipeTransitionEnabled, setSwipeTranslate]);

  const handleSwipeTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!onClose) return;
      if (!swipeToClose?.length) return;
      if (!isTopmostBackdrop()) return;
      if (isSwipeClosing) return;
      if (event.touches.length !== 1) return;

      const target = event.target as Element | null;
      if (
        !target ||
        !target.classList.contains(styles.pureModalBackdrop)
      ) {
        return;
      }

      const touch = event.touches[0];
      swipeStateRef.current.isTracking = true;
      swipeStateRef.current.isDragging = false;
      swipeStateRef.current.startX = touch.clientX;
      swipeStateRef.current.startY = touch.clientY;
      swipeStateRef.current.activeDirection = null;
      swipeStateRef.current.lastTranslateX = 0;
      swipeStateRef.current.lastTranslateY = 0;
    },
    [isSwipeClosing, isTopmostBackdrop, onClose, swipeToClose],
  );

  const handleSwipeTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!swipeStateRef.current.isTracking) return;
      if (isSwipeClosing) return;
      if (event.touches.length !== 1) return;
      if (!swipeToClose?.length) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - swipeStateRef.current.startX;
      const deltaY = touch.clientY - swipeStateRef.current.startY;

      if (!swipeStateRef.current.activeDirection) {
        if (
          Math.abs(deltaX) < SWIPE_DIRECTION_LOCK_PX &&
          Math.abs(deltaY) < SWIPE_DIRECTION_LOCK_PX
        ) {
          return;
        }

        const direction = getSwipeDirection(deltaX, deltaY);
        if (!swipeToClose.includes(direction)) {
          swipeStateRef.current.isTracking = false;
          return;
        }

        swipeStateRef.current.activeDirection = direction;
        swipeStateRef.current.isDragging = true;
        setSwipeTransitionEnabled(false);
      }

      const direction = swipeStateRef.current.activeDirection;
      if (!direction) return;

      const directionalDelta = getDirectionalDelta(direction, deltaX, deltaY);
      if (getSwipeAxis(direction) === "x") {
        setSwipeTranslate(directionalDelta, 0);
        return;
      }

      setSwipeTranslate(0, directionalDelta);
    },
    [isSwipeClosing, setSwipeTransitionEnabled, setSwipeTranslate, swipeToClose],
  );

  const handleSwipeTouchEnd = useCallback(() => {
    if (!swipeStateRef.current.isTracking) {
      return;
    }

    const direction = swipeStateRef.current.activeDirection;
    swipeStateRef.current.isTracking = false;
    swipeStateRef.current.activeDirection = null;

    if (!direction) {
      resetSwipe();
      return;
    }

    const rect = swipeWrapperRef.current?.getBoundingClientRect();
    const axisSize =
      rect
        ? getSwipeAxis(direction) === "x"
          ? rect.width
          : rect.height
        : getSwipeAxis(direction) === "x"
          ? window.innerWidth
          : window.innerHeight;
    const threshold = getSwipeCloseThreshold(axisSize);
    const travelled =
      getSwipeAxis(direction) === "x"
        ? Math.abs(swipeStateRef.current.lastTranslateX)
        : Math.abs(swipeStateRef.current.lastTranslateY);

    if (travelled < threshold) {
      swipeStateRef.current.isDragging = false;
      setSwipeTransitionEnabled(true);
      setSwipeTranslate(0, 0);
      return;
    }

    if (!rect) {
      swipeStateRef.current.isDragging = false;
      setSwipeTransitionEnabled(true);
      setSwipeTranslate(0, 0);
      return;
    }

    const currentTranslateX = swipeStateRef.current.lastTranslateX;
    const currentTranslateY = swipeStateRef.current.lastTranslateY;
    const originalLeft = rect.left - currentTranslateX;
    const originalRight = rect.right - currentTranslateX;
    const originalTop = rect.top - currentTranslateY;
    const originalBottom = rect.bottom - currentTranslateY;

    let targetTranslateX = 0;
    let targetTranslateY = 0;

    switch (direction) {
      case "left-right":
        targetTranslateX =
          window.innerWidth + SWIPE_OFFSCREEN_MARGIN_PX - originalLeft;
        break;
      case "right-left":
        targetTranslateX = -SWIPE_OFFSCREEN_MARGIN_PX - originalRight;
        break;
      case "up-down":
        targetTranslateY =
          window.innerHeight + SWIPE_OFFSCREEN_MARGIN_PX - originalTop;
        break;
      case "down-up":
        targetTranslateY = -SWIPE_OFFSCREEN_MARGIN_PX - originalBottom;
        break;
    }

    setIsSwipeClosing(true);
    swipeStateRef.current.isDragging = false;
    setSwipeTransitionEnabled(true);
    setSwipeTranslate(targetTranslateX, targetTranslateY);
  }, [resetSwipe, setSwipeTransitionEnabled, setSwipeTranslate]);

  const handleSwipeTouchCancel = useCallback(() => {
    resetSwipe();
  }, [resetSwipe]);

  const handleSwipeTransitionEnd = useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (!isSwipeClosing) return;
      if (event.propertyName !== "transform") return;
      if (event.target !== swipeWrapperRef.current) return;
      setIsSwipeClosing(false);
      onClose?.();
    },
    [isSwipeClosing, onClose],
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
      onTouchStart={handleSwipeTouchStart}
      onTouchMove={handleSwipeTouchMove}
      onTouchEnd={handleSwipeTouchEnd}
      onTouchCancel={handleSwipeTouchCancel}
      aria-modal="true"
      role="dialog"
      style={style as CSSProperties}
    >
      <div
        ref={swipeWrapperRef}
        className={styles.pureModalSwipeWrapper}
        onTransitionEnd={handleSwipeTransitionEnd}
      >
        {children}
      </div>
    </div>
  );
}
