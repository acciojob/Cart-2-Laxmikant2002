import React, { useContext, useReducer, useEffect } from "react";
import { cartItems } from "./data";

const CartContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  
  if (action.type === "INCREASE") {
    let tempCart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }
      return item;
    });
    return { ...state, cart: tempCart };
  }
  
  if (action.type === "DECREASE") {
    let tempCart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }
        return item;
      })
      .filter((item) => item.amount !== 0);
    return { ...state, cart: tempCart };
  }
  
  if (action.type === "GET_TOTALS") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;

        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));

    return { ...state, total, amount };
  }
  
  return state;
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: cartItems,
    total: 0,
    amount: 0,
  });

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  
  const remove = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(CartContext);
};

export { CartContext, CartProvider };
