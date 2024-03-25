import "./App.css";
import { ethers } from "ethers";
import WalletDisplay from "./Components/WalletDisplay";
import { useTodoList } from "./hooks/useTodoList";
import useWallet from "./hooks/useWallet";
import Form from "./Components/Todo/Form";
import TodosStatistics from "./Components/Todo/TodoStatistics";
import TodoList from "./Components/Todo/TodoList";

if (window.ethereum) {
  window.provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  console.error(
    "Ethers.js: Web3 provider not found. Please install a wallet with Web3 support.",
  );
}

function App() {
  const { wallet, refreshWalletBalance } = useWallet();
  const { todos, createTodo, toggleTodo, removeTodo } =
    useTodoList(refreshWalletBalance);

  return (
    <>
      <main>
        <WalletDisplay accounts={wallet.accounts} balance={wallet.balance} />
        <Form onCreateTodo={createTodo} />
        <TodoList
          todos={todos}
          onRemoveTodo={removeTodo}
          onToggleTodo={toggleTodo}
        />
      </main>
      <TodosStatistics todos={todos} />
    </>
  );
}

export default App;
