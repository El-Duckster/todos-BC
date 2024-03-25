import Button from '../UI/Button'

const TodoItem = ({ id, todoText, completed, onToggleTodo, onRemoveTodo }) => {
  
    const removeTodoHandeler = () => {
      onRemoveTodo(id);
    };
  
    const toggleTodoHandeler = () => {
      onToggleTodo(id);
    };
    return (
      <>
        <li>
          <div>
            <input type="checkbox" checked={completed} onChange={toggleTodoHandeler} />
            <span style={completed ? { textDecoration: "line-through" } : null}>
              {todoText}
            </span>
            <Button onClick={removeTodoHandeler}>❌</Button>
          </div>
          <div></div>
        </li>
      </>
    );
  };
  
  export default TodoItem;