
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

export default function TodoInput() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Enter todo..." />
      <button type="submit">Add</button>
    </form>
  );
}
