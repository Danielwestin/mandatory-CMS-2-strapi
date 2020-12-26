import styles from "./Modal.module.css";

export default function Modal({ children, close }) {
  return (
    <div className={styles.background} onClick={close}>
      <main onClick={(e) => e.stopPropagation()}>{children}</main>
    </div>
  );
}
