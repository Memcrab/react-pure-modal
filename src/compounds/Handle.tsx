import { useCallback, useRef } from "react";
import styles from "./Modal.module.css";
import { useModalContext } from "./ModalContext";
import type { ModalHandlePosition, ModalSwipeDirection } from "./Modal.types";

const SWIPE_DIRECTION_LOCK_PX = 6;
const SWIPE_CLOSE_MIN_PX = 80;
const SWIPE_CLOSE_RATIO = 0.2;
const SWIPE_OFFSCREEN_MARGIN_PX = 24;

const POSITION_DIRECTION_MAP: Record<
  ModalHandlePosition,
  ModalSwipeDirection
> = {
  top: "up-down",
  bottom: "down-up",
  left: "left-right",
  right: "right-left",
};

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

type ModalHandleProps = {
  position: ModalHandlePosition;
};

export function ModalHandle({ position }: ModalHandleProps) {
  const { onClose } = useModalContext();
  const handleRef = useRef<HTMLDivElement | null>(null);
  const swipeStateRef = useRef({
    isTracking: false,
    isClosing: false,
    startX: 0,
    startY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    swipeWrapper: null as HTMLElement | null,
  });

  const isTopmostBackdrop = useCallback((handleNode: HTMLElement): boolean => {
    const backdropNode = handleNode.closest(`.${styles.pureModalBackdrop}`);
    if (!backdropNode) return false;
    const currentZindexNode = getNodeZIndex(backdropNode);
    const maximumZindex = getMaximumNodeZIndex(
      `.${styles.pureModalBackdrop}`,
    );
    return currentZindexNode === maximumZindex;
  }, []);

  const setSwipeTranslate = useCallback(
    (wrapper: HTMLElement, x: number, y: number) => {
      wrapper.style.setProperty("--modal-swipe-translate-x", `${x}px`);
      wrapper.style.setProperty("--modal-swipe-translate-y", `${y}px`);
      swipeStateRef.current.lastTranslateX = x;
      swipeStateRef.current.lastTranslateY = y;
    },
    [],
  );

  const setSwipeTransitionEnabled = useCallback(
    (wrapper: HTMLElement, enabled: boolean) => {
      wrapper.style.transition = enabled ? "" : "none";
    },
    [],
  );

  const resetSwipe = useCallback(() => {
    if (swipeStateRef.current.isClosing) {
      return;
    }
    const wrapper = swipeStateRef.current.swipeWrapper;
    swipeStateRef.current.isTracking = false;
    swipeStateRef.current.isClosing = false;
    swipeStateRef.current.startX = 0;
    swipeStateRef.current.startY = 0;
    swipeStateRef.current.lastTranslateX = 0;
    swipeStateRef.current.lastTranslateY = 0;
    swipeStateRef.current.swipeWrapper = null;

    if (wrapper) {
      setSwipeTransitionEnabled(wrapper, true);
      setSwipeTranslate(wrapper, 0, 0);
    }
  }, [setSwipeTransitionEnabled, setSwipeTranslate]);

  const handleTouchStart = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!onClose) return;
      if (event.touches.length !== 1) return;

      const handleNode = handleRef.current;
      if (!handleNode) return;
      if (!isTopmostBackdrop(handleNode)) return;
      if (swipeStateRef.current.isClosing) return;

      const swipeWrapper = handleNode.closest(
        `.${styles.pureModalSwipeWrapper}`,
      ) as HTMLElement | null;
      if (!swipeWrapper) return;

      const touch = event.touches[0];
      swipeStateRef.current.isTracking = true;
      swipeStateRef.current.startX = touch.clientX;
      swipeStateRef.current.startY = touch.clientY;
      swipeStateRef.current.lastTranslateX = 0;
      swipeStateRef.current.lastTranslateY = 0;
      swipeStateRef.current.swipeWrapper = swipeWrapper;
      setSwipeTransitionEnabled(swipeWrapper, false);
    },
    [isTopmostBackdrop, onClose, setSwipeTransitionEnabled],
  );

  const handleTouchMove = useCallback(
    (event: React.TouchEvent<HTMLDivElement>) => {
      if (!swipeStateRef.current.isTracking) return;
      if (event.touches.length !== 1) return;
      const direction = POSITION_DIRECTION_MAP[position];
      const axis = getSwipeAxis(direction);

      const swipeWrapper = swipeStateRef.current.swipeWrapper;
      if (!swipeWrapper) return;

      const touch = event.touches[0];
      const deltaX = touch.clientX - swipeStateRef.current.startX;
      const deltaY = touch.clientY - swipeStateRef.current.startY;
      const axisDelta = axis === "x" ? deltaX : deltaY;
      if (Math.abs(axisDelta) < SWIPE_DIRECTION_LOCK_PX) {
        return;
      }

      const directionalDelta = getDirectionalDelta(direction, deltaX, deltaY);
      if (axis === "x") {
        setSwipeTranslate(swipeWrapper, directionalDelta, 0);
      } else {
        setSwipeTranslate(swipeWrapper, 0, directionalDelta);
      }
      event.preventDefault();
    },
    [position, setSwipeTranslate],
  );

  const handleTouchEnd = useCallback(() => {
    if (!swipeStateRef.current.isTracking) {
      return;
    }

    swipeStateRef.current.isTracking = false;
    const swipeWrapper = swipeStateRef.current.swipeWrapper;
    if (!swipeWrapper) {
      return;
    }

    const direction = POSITION_DIRECTION_MAP[position];
    const axis = getSwipeAxis(direction);
    const rect = swipeWrapper.getBoundingClientRect();
    const axisSize = axis === "x" ? rect.width : rect.height;
    const threshold = getSwipeCloseThreshold(axisSize);
    const travelled =
      axis === "x"
        ? Math.abs(swipeStateRef.current.lastTranslateX)
        : Math.abs(swipeStateRef.current.lastTranslateY);

    if (travelled < threshold) {
      setSwipeTransitionEnabled(swipeWrapper, true);
      setSwipeTranslate(swipeWrapper, 0, 0);
      swipeStateRef.current.swipeWrapper = null;
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

    swipeStateRef.current.isClosing = true;
    setSwipeTransitionEnabled(swipeWrapper, true);
    setSwipeTranslate(swipeWrapper, targetTranslateX, targetTranslateY);

    const handleTransitionEnd = (transitionEvent: TransitionEvent) => {
      if (transitionEvent.propertyName !== "transform") return;
      if (transitionEvent.target !== swipeWrapper) return;
      swipeWrapper.removeEventListener("transitionend", handleTransitionEnd);
      swipeStateRef.current.isClosing = false;
      swipeStateRef.current.swipeWrapper = null;
      onClose?.();
    };

    swipeWrapper.addEventListener("transitionend", handleTransitionEnd);
  }, [onClose, position, setSwipeTransitionEnabled, setSwipeTranslate]);

  const handleTouchCancel = useCallback(() => {
    resetSwipe();
  }, [resetSwipe]);

  return (
    <div
      ref={handleRef}
      className={styles.pureModalHandle}
      data-position={position}
      aria-hidden="true"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
    />
  );
}
