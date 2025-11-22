import { createContext, useContext } from "react";
import type { ModalProps } from "./Modal.types";

export type ModalContextType = Pick<
  ModalProps,
  "isOpen" | "onClose" | "closeOnBackdropClick" | "style"
> & {};

export const ModalContext = createContext<ModalContextType | undefined>(
  undefined,
);

export function useModalContext(): ModalContextType {
  const ctx = useContext(ModalContext);
  return (ctx ?? {}) as ModalContextType;
}
