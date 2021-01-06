import { useState } from "react";
import AddCartItemModal from "../../components/modules/AddCartItemModal";
import LoginModal from "../../components/modules/LoginModal";
import ModalContext from "../../contexts/modal";

const modals = {
  LoginModal,
  AddCartItemModal,
};

const initialModalState = {
  name: "",
  context: {},
};

export default function ModalMiddleware({ children }) {
  const [modal, setModal] = useState(initialModalState);

  function closeModal() {
    setModal(initialModalState);
  }

  const Modal = modal.name && modals[modal.name];

  const value = {
    setModal: (name, context = {}) => setModal({ name, context }),
    closeModal,
    context: modal.context,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {Modal && <Modal />}
    </ModalContext.Provider>
  );
}
