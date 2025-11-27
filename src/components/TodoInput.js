
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';

export default function TodoInput() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const value = text.trim();
    if (!value) return;
    dispatch(addTodo(value));
    setText('');
  };

  return (
    <form
      onSubmit={submitHandler}
      style={{ marginBottom: '0.75rem', display: 'flex', gap: '0.5rem' }}
    >
      <input
        className="input"
        type="text"
        placeholder="Enter a task and press Add..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Add
      </button>
    </form>
  );
}
