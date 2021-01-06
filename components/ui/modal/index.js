import { useCloseModal } from "../../../contexts/modal";
import styles from "./Modal.module.css";

export default function Modal({ children }) {
  const closeModal = useCloseModal();

  return (
    <div className={styles.background} onClick={closeModal}>
      <main onClick={(e) => e.stopPropagation()}>{children}</main>
    </div>
  );
}
