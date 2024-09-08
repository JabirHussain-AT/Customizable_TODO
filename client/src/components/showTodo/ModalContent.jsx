import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';
import IconPicker from 'react-icons-picker';
import { PlusCircle, AlertCircle } from "lucide-react";

const ModalContent = ( { onclose  , todos , setTodos , saveTodo , submitFun }) => {
  const [todoText, setTodoText] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("CgNotes");


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (todoText.trim() === "") {
      toast.error("Todo text cannot be empty", {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
      return;
    }

    const newTodo = {
      id: uuidv4(), 
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isCompleted: false,
      description: "",
      title: todoText,
      icon: selectedIcon,
      subItems: []
    };

    submitFun( newTodo  )
    
    onclose()

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTodoText("");
      setSelectedIcon("FaUsers");
      toast.success("Todo added successfully!", {
        icon: <PlusCircle className="h-5 w-5 text-green-500" />,
      });
    } catch (error) {
      console.error("Error submitting todo:", error);
      toast.error("Failed to submit todo. Please try again.", {
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="todo-text"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Todo Title
        </label>
        <input
          id="todo-text"
          type="text"
          placeholder="Enter your todo title"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div>
        <label
          htmlFor="icon-picker"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Select an Icon (optional)
        </label>
        <IconPicker
          id="icon-picker"
          value={selectedIcon}
          onChange={(v) => setSelectedIcon(v)}
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PlusCircle className="mr-2 h-4 w-4" /> Add Todo
      </button>
    </form>
  );
};

export default ModalContent;
