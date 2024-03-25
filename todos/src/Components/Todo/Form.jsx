import { useState } from "react";
import Button from "../UI/Button";

const Form = ({ onCreateTodo }) => {
  const [newTodo, setNewTodo] = useState("");

  const submitHandeler = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    onCreateTodo(newTodo);
    setNewTodo("");
  };

  return (
    <>
      <form onSubmit={submitHandeler} className="add-form">
        <h3>Add A new Task 🎉</h3>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
        <Button type="submit">Add Todo</Button>
      </form>
    </>
  );
};

export default Form;
