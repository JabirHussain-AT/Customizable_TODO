import React, { useEffect, useState } from "react";
import TodoItem from "../components/showTodo/TodoItem";
import ModalBox from "../components/common/ModalBox";
import { FaPaintBrush  } from "react-icons/fa";
import { List } from "lucide-react";
import ModalContent from "../components/showTodo/ModalContent";
import { fetchTodo, saveTodo } from "../utils/persistance";
import { v4 as uuidv4 } from "uuid";
import Customization from "../components/showTodo/Customization";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const ShowToDo = () => {
  //states
  const [todos, setTodos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showTodos, setShowTodos] = useState(true);
  const [fontStyle, setFontStyle] = useState("sans-serif");
  const [fontColor, setFontColor] = useState("violet");

  //sensors from dnd- drag and drop helper
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  //fetching the stored items from the local storage
  useEffect(() => {
    const storedTodos = fetchTodo();
    if (storedTodos && storedTodos.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  //function written to onClose the opened Modal
  const onCloseModal = () => {
    setIsOpen(false);
  };

  //for submiting main tasks
  const handleMainSubmit = (newTodoData) => {
    const newTodo = {
      id: uuidv4(),
      title: newTodoData.title,
      isCompleted: false,
      subItems: [],
      icon: newTodoData.icon,
    };

    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
    setIsOpen(false);
  };

  const handleToggleTodos = () => {
    setShowTodos(!showTodos);
  };

  //drag end checker / controller
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const newItems = arrayMove(items, oldIndex, newIndex);
        saveTodo(newItems);
        return newItems;
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-12 px-4 transition-colors duration-300 ">
      <div className="max-w-4xl mx-auto">
        {/* Customization Panel */}
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="py-1 px- flex items-center gap-2 p-2 rounded-md hover:bg-violet-500 bg-violet-400 text-white font-bold font-sans"
          >
            <span>
              {" "}
              <FaPaintBrush />
            </span>{" "}
            Customize
          </button>
          <button
            onClick={handleToggleTodos}
            className="py-1 px-6 rounded-md hover:bg-violet-500 bg-violet-400 text-white font-bold font-sans"
          >
            {showTodos ? "Hide Todos" : "Show Todos"}
          </button>
        </div>

        {/* Customization Section */}
        {showCustomization && (
          <Customization
            fontColor={fontColor}
            fontStyle={fontStyle}
            setFontStyle={setFontStyle}
            setFontColor={setFontColor}
          />
        )}

        <div
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 transition-colors duration-300`}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1
              className={`text-2xl sm:text-4xl font-bold flex items-center mb-4 sm:mb-8`}
              style={{ fontFamily: fontStyle, color: fontColor }}
            >
              <List
                size={24}
                className="mr-2 sm:mr-3 text-xs text-purple-600 dark:text-purple-400"
              />
              My Todo Lists
            </h1>
            <button
              onClick={() => setIsOpen(true)}
              className="py-1 px-4 sm:px-6 sm:py-2 rounded-md hover:bg-violet-500 bg-violet-400 text-white font-bold mt-2 sm:mt-0 mb-5"
            >
              Add Todo +
            </button>
          </div>

          {/* Todo Items */}
          {showTodos && (
            <div className="space-y-6">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={todos.map((todo) => todo.id)}
                  strategy={verticalListSortingStrategy}
                >
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
                </SortableContext>
              </DndContext>
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
          submitFun={handleMainSubmit}
        />
      </ModalBox>
    </div>
  );
};

export default ShowToDo;
