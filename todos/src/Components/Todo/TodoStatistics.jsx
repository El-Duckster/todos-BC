const TodosStatistics = ({ todos }) => {
    if (!todos.length)
      return (
        <p className="stats">
          <em>Start adding new todo to your to-do list 🚀</em>
        </p>
      );
  
    const numTodos = todos.length;
    const numDone = todos.filter((todos) => todos.completed).length;
    const percentage = Math.round((numDone / numTodos) * 100);
  
    return (
      <>
        <footer>
          <em>
            {percentage === 100
              ? "You got everything! Add more todos ✈️"
              : `You have ${numTodos} todos on your list, and you have already marked ${numDone} (${percentage}%)`}
          </em>
        </footer>
      </>
    );
  };
  
  export default TodosStatistics;