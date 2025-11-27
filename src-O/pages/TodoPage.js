
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

export default function TodoPage() {
  return (
    <div>
      <h2>Todo List (Redux)</h2>
      <TodoInput />
      <TodoList />
    </div>
  );
}
