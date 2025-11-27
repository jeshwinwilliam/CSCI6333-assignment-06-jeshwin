
import { createSlice, nanoid } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [], // { id, text }
  },
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.items.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
          },
        };
      },
    },
    removeTodo(state, action) {
      const id = action.payload;
      state.items = state.items.filter((t) => t.id !== id);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todos.items;

export default todoSlice.reducer;
