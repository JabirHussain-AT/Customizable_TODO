import toast from 'react-hot-toast';

function saveTodo(items) {
  try {
    localStorage.setItem("todos", JSON.stringify(items));
    toast.success("Todos saved successfully!", {
      icon: "✅",
    });
  } catch (error) {
    toast.error("Error saving todos. Please try again.", {
      icon: "❌",
    });
    console.error("Error saving todos to localStorage:", error);
  }
}

function fetchTodo() {
  try {
    const storedTodos = localStorage.getItem("todos");
    toast.success("Todos loaded successfully!", {
      icon: "✅",
    });
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    toast.error("Error loading todos. Please try again.", {
      icon: "❌",
    });
    console.error("Error fetching todos from localStorage:", error);
    return [];
  }
}

export { fetchTodo, saveTodo };
