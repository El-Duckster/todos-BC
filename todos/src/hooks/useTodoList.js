import { useCallback, useEffect, useState } from 'react';
import { useContract } from './useContract'; // Assuming this is the path to your useContract hook




export const useTodoList = (refreshWalletBalance) => {
    const { readContract, writeContract } = useContract();
    const [todos, setTodos] = useState([]);

    // Fetching todos from the blockchain
    const fetchTodos = useCallback(async () => {
        if (!readContract) return;

        try {
            const todoCount = await readContract.todoCount();
            const todosPromises = [];
            for (let i = 1; i <= todoCount; i++) {
                todosPromises.push(readContract.todos(i));
            }
            const todos = (await Promise.all(todosPromises))
            .filter(todo => todo.text !== '');
            setTodos(todos);
        } catch (error) {
            console.error("Failed to fetch todos", error);
        }
    }, [readContract]);


    const createTodo = async (text) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.createTodo(text);
            const receipt = await transaction.wait(); 
            if (receipt.status) {
                await fetchTodos(); 
                await refreshWalletBalance(); 
            } else {
                console.error('Transaction failed: ', receipt);
            }
        } catch (error) {
            console.error("Failed to create todo", error);
        }
    };

    // Toggling the completion status of a todo
    const toggleTodo = async (id) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.toggleTodo(id);
            await transaction.wait();
            fetchTodos(); 
            await refreshWalletBalance();
        } catch (error) {
            console.error("Failed to toggle todo", error);
        }
    };


    const removeTodo = async (id) => {
        if (!writeContract) return;

        try {
            const transaction = await writeContract.removeTodo(id);
            await transaction.wait();
            fetchTodos(); 
           await  refreshWalletBalance();
        } catch (error) {
            console.error("Failed to remove todo", error);
        }
    };

  
    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return { todos, createTodo, toggleTodo, removeTodo, fetchTodos };
};
