import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAllTodos = async () => {
    try {
      const existingTodos = await AsyncStorage.getItem('todoList');
      return existingTodos ? JSON.parse(existingTodos) : [];
    } catch (e) {
      console.error("Failed to fetch todoList:", e);
      return [];
    }
  };

export const addTodo = async (todo) => {
    try {
        const existingTodos = await AsyncStorage.getItem('todoList');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
        todos.push(todo);
        await AsyncStorage.setItem('todoList', JSON.stringify(todos));
    } catch (e) {
        console.error("Failed to save todoList:", e);
    }
};

export const editTodo = async (updatedTodo) => {
    try {
        const existingTodos = await AsyncStorage.getItem('todoList');
        let todos = existingTodos ? JSON.parse(existingTodos) : [];
        todos = todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo);
        await AsyncStorage.setItem('todoList', JSON.stringify(todos));
    } catch (e) {
        console.error("Failed to update todo:", e);
    }
};

export const deleteTodo = async (id) => {
    try {
        const existingTodos = await AsyncStorage.getItem('todoList');
        const todos = existingTodos ? JSON.parse(existingTodos) : [];
        const filteredTodos = todos.filter(todo => todo.id !== id);
        await AsyncStorage.setItem('todoList', JSON.stringify(filteredTodos));
    } catch (e) {
        console.error("Failed to delete todo:", e);
    }
};
