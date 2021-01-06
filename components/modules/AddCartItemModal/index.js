import { useState } from "react";
import { useAddToCart, useUpdateCartAmount } from "../../../contexts/cart";
import { useCloseModal, useModalContext } from "../../../contexts/modal";
import Modal from "../../ui/Modal";
import styles from "./AddCartItemModal.module.css";

export default function AddCartItemModal() {
  const { type, product } = useModalContext();
  const addToCart = useAddToCart();
  const closeModal = useCloseModal();
  const [amount, setAmount] = useState(product?.amount || 1);
  const updateCartAmount = useUpdateCartAmount();

  function handleSubmit(e) {
    e.preventDefault();
    if (type === "add") {
      addToCart(product, amount);
    } else {
      updateCartAmount(product, amount);
    }
    closeModal();
  }

  return (
    <Modal>
      <form onSubmit={handleSubmit}>
        <label className={styles.formLabel}>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max="255"
          />
        </label>
        <button className={styles.formSubmit} type="submit">
          Submit
        </button>
      </form>
    </Modal>
  );
}
