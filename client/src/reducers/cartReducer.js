let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};