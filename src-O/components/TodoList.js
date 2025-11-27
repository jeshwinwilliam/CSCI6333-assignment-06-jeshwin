
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, removeTodo } from '../features/todos/todoSlice';

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  if (!todos.length) return <p>No tasks yet.</p>;

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button style={{marginLeft:'8px',background:'red',color:'#fff'}} onClick={() => dispatch(removeTodo(todo.id))}>x</button>
        </li>
      ))}
    </ul>
  );
}
