import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import TodoReducer from "./TodoList";
import themeReducer from "./theme/theme.js";
const store = configureStore({
  reducer: {
    auth: AuthReducer,
    todos: TodoReducer,
    theme: themeReducer,
  },
});

export default store;
