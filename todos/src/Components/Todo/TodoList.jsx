import { useState } from "react";
import Card from "../UI/Card";
import TodoItem from "./TodoItem";

const TodoList = ({todos, onToggleTodo, onRemoveTodo}) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedTodos;

  if (sortBy === "input") sortedTodos = todos;

  if (sortBy === "completed")
    sortedTodos = todos
      .slice()
      .sort((a, b) => Number(a.completed) - Number(b.completed));
  const todosList = sortedTodos?.map((todo) => (
    
    
    <TodoItem
      key={todo.id}
      id={todo.id}
      todoText={todo.text}
      completed={todo.completed}
      onRemoveTodo={onRemoveTodo}
      onToggleTodo={onToggleTodo}
    />
  ));

  return (
    <>
      <Card>
        <ul>{todosList}</ul>
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="completed">Sort by completed status</option>
          </select>
        </div>
      </Card>
    </>
  );
};

export default TodoList;
