import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (item, totalAmount, totalQuantity) => {
  localStorage.setItem("cartItems", JSON.stringify(item));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === newItem.id && item.instruction === newItem.instruction
      );

      if (existingItemIndex === -1) {
        state.cartItems = [
          ...state.cartItems,
          {
            id: newItem.id,
            title: newItem.title,
            image01: newItem.image01,
            instruction: newItem.instruction,
            price: newItem.price,
            pickUpTime: newItem.pickUpTime,
            status: newItem.status,
            quantity: 1,
            totalPrice: newItem.price,
          },
        ];
      } else {
        state.cartItems[existingItemIndex].quantity++;
        state.cartItems[existingItemIndex].totalPrice += Number(newItem.price);
      }

      state.totalQuantity++;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
    },

    removeItem(state, action) {
      const { id, instruction } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.instruction === instruction
      );

      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
        existingItem.quantity--;
        existingItem.totalPrice -= Number(existingItem.price);

        if (existingItem.quantity === 0) {
          state.cartItems.splice(existingItemIndex, 1);
        }

        state.totalQuantity--;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );

        setItemFunc(state.cartItems.map((item) => item), state.totalAmount, state.totalQuantity);
      }
    },

    deleteItem(state, action) {
      const { id, instruction } = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === id && item.instruction === instruction
      );
    
      if (existingItemIndex !== -1) {
        const existingItem = state.cartItems[existingItemIndex];
    
        // Decrement the total quantity and total amount
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= Number(existingItem.totalPrice);
    
        // Remove the item from the cart
        state.cartItems.splice(existingItemIndex, 1);
    
        if (state.cartItems.length === 0) {
          // If the cart is empty, remove the 'cartItems' key from local storage
          localStorage.removeItem("cartItems");
        }
    
        // Update the local storage and Redux state
        setItemFunc(
          state.cartItems.map((item) => item),
          state.totalAmount,
          state.totalQuantity
        );
      }
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
