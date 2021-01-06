import { createContext, useContext } from "react";

const ModalContext = createContext();

export function useSetModal() {
  return useContext(ModalContext).setModal;
}

export function useCloseModal() {
  return useContext(ModalContext).closeModal;
}

export function useModalContext() {
  return useContext(ModalContext).context;
}

export default ModalContext;
