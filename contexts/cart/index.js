import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "../../library/hooks";

const CartContext = createContext();

const ADD_PRODUCT = "ADD_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";
const CLEAR_CART = "CLEAR_CART";
const LOAD_CART = "LOAD_CART";

const initialCart = [];

function reducer(cart, { type, payload }) {
  const newCart = [...cart];

  switch (type) {
    case ADD_PRODUCT: {
      const indexToUpdate = newCart.findIndex(({ id }) => payload.id === id);

      if (indexToUpdate >= 0) {
        newCart[indexToUpdate].amount =
          parseInt(payload.amount) + parseInt(newCart[indexToUpdate].amount);
      } else {
        newCart.push(payload);
      }

      break;
    }

    case UPDATE_PRODUCT: {
      const indexToUpdate = newCart.findIndex(({ id }) => payload.id === id);
      newCart[indexToUpdate] = payload;
      break;
    }

    case REMOVE_PRODUCT: {
      return newCart.filter(({ id }) => id !== payload.id);
    }

    case CLEAR_CART: {
      return initialCart;
    }

    case LOAD_CART: {
      return payload;
    }

    default: {
      return cart;
    }
  }

  return newCart;
}

export function useCart() {
  return useContext(CartContext).cart;
}

export function useAddToCart() {
  return useContext(CartContext).addToCart;
}

export function useRemoveFromCart() {
  return useContext(CartContext).removeFromCart;
}

export function useUpdateCartAmount() {
  return useContext(CartContext).updateCartAmount;
}

export function useClearCart() {
  return useContext(CartContext).clearCart;
}

export function useCartContext() {
  return useContext(CartContext);
}

export default function CartProvider({ children }) {
  const [storedCart, setStoredCart] = useLocalStorage("cart", initialCart);
  const [cart, dispatch] = useReducer(reducer, initialCart);

  useEffect(() => {
    if (cart.length > 0) {
      setStoredCart(cart);
    } else {
      setStoredCart();
    }
  }, [cart]);

  /**
   * Prevents 'Expected server HTML to contain a matching <tag> in <tag>'-warning
   * https://github.com/vercel/next.js/discussions/17443
   * */
  useEffect(() => {
    if (storedCart.length) dispatch({ type: LOAD_CART, payload: storedCart });
  }, []);

  const context = {
    cart,
    addToCart: (product, amount) =>
      dispatch({
        type: ADD_PRODUCT,
        payload: { ...product, amount },
      }),
    removeFromCart: (product) =>
      dispatch({
        type: REMOVE_PRODUCT,
        payload: product,
      }),
    updateCartAmount: (product, amount) =>
      dispatch({
        type: UPDATE_PRODUCT,
        payload: { ...product, amount },
      }),
    clearCart: () =>
      dispatch({
        type: CLEAR_CART,
      }),
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
