export const userReducer = (state = null, action) => {
    switch (action.type) {
      case "LOGGED_IN_USER":
        // Assuming action.payload contains user data
        return action.payload;
  
      case "LOGOUT":
        return null; // Reset user state to null on logout
  
      default:
        return state;
    }
  };
  