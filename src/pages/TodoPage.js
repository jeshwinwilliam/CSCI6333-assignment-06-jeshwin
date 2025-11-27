
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';

export default function TodoPage() {
  return (
    <div>
      <div className="page-heading">
        <h2 className="page-title">TO-DO Application</h2>
        <p className="page-subtitle">
          Add tasks, keep track of what you need to do, and remove items when you’re done.
        </p>
      </div>

      <section className="card">
        <div className="card-header">
          <h3 className="card-title">Your TO-DO List</h3>
          <span className="card-tag">Manage tasks</span>
        </div>
        <TodoInput />
        <TodoList />
      </section>
    </div>
  );
}
