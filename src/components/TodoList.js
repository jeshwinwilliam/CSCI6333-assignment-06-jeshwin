
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, removeTodo } from '../features/todos/todoSlice';

export default function TodoList() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();

  if (!todos.length) {
    return (
      <div className="empty-state">
        No tasks yet. Add a task above and it will show up in this list.
      </div>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span>• {todo.text}</span>
          <button
            className="btn btn-danger btn-circle"
            onClick={() => dispatch(removeTodo(todo.id))}
            title="Delete task"
          >
            x
          </button>
        </li>
      ))}
    </ul>
  );
}
