import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.find((todo) => todo.id === id);
            if (todo) {
                todo.text = text;
            }
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload);
        },
    },
});

export const { addTodo, toggleTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;