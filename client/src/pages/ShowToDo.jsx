import React, { useEffect, useState } from "react";
import TodoItem from "../components/showTodo/TodoItem";
import ModalBox from "../components/common/ModalBox";
import { List } from "lucide-react";
import ModalContent from "../components/showTodo/ModalContent";
import { fetchTodo, saveTodo } from "../utils/persistance";

const ShowToDo = () => {
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showTodos, setShowTodos] = useState(true);
  const [fontStyle, setFontStyle] = useState("sans-serif");
  const [fontColor, setFontColor] = useState("#333");

  // Fetch todos from localStorage when the component mounts
  useEffect(() => {
    const storedTodos = fetchTodo();
    if (storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  const handleMainSubmit = (newTodo) => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };

  const handleToggleTodos = () => {
    setShowTodos(!showTodos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-12 px-4 transition-colors duration-300 ">
      <div className="max-w-4xl mx-auto">
        {/* Customization Panel */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className=" py-1 px-6 rounded-md  hover:bg-violet-500 bg-violet-400 text-white font-bold font-sans"
          >
            Customize
          </button>
          <button
            onClick={handleToggleTodos}
            className=" py-1 px-6 rounded-md  hover:bg-violet-500 bg-violet-400 text-white font-bold font-sans"
          >
            {showTodos ? "Hide Todos" : "Show Todos"}
          </button>
        </div>

        {/* Customization Section */}
        {showCustomization && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
            <h2 className="text-xl font-bold mb-4">Customize Your Todo List</h2>
            <div className="flex flex-col space-y-4">
              {/* Font Style */}
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2">
                  Font Style:
                </label>
                <select
                  className="rounded-md p-2"
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value)}
                >
                  <option value="sans-serif">Sans-serif</option>
                  <option value="serif">Serif</option>
                  <option value="monospace">Monospace</option>
                  <option value="cursive">Cursive</option>
                </select>
              </div>

              {/* Font Color */}
              <div>
                <label className="block text-gray-800 dark:text-gray-200 mb-2">
                  Font Color:
                </label>
                <input
                  type="color"
                  className="rounded-md p-1"
                  value={fontColor}
                  onChange={(e) => setFontColor(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-colors duration-300`}
        >
          <div className="flex justify-between">
            <h1
              className={`text-4xl font-bold flex items-center mb-8`}
              style={{ fontFamily: fontStyle, color: fontColor }}
            >
              <List
                size={32}
                className="mr-3 text-purple-600 dark:text-purple-400"
              />
              My Todo Lists
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className=" py-1 px-6 m-3 rounded-md  hover:bg-violet-500 bg-violet-400 text-white font-bold"
            >
              Add Todo +
            </button>
          </div>

          {/* Todo Items */}
          {showTodos && (
            <div className="space-y-6">
              {todos?.map((item) => (
                <TodoItem
                  key={item?.id}
                  todo={item}
                  todos={todos}
                  setTodos={setTodos}
                  fontStyle={fontStyle} 
                  fontColor={fontColor}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ModalBox */}
      <ModalBox isOpen={isOpen} onClose={onCloseModal}>
        {/* ModalContent */}
        <ModalContent
          onclose={onCloseModal}
          todos={todos}
          setTodos={setTodos}
          saveTodo={saveTodo}
          submitFun={(data) => handleMainSubmit(data)}
        />
      </ModalBox>
    </div>
  );
};

export default ShowToDo;
