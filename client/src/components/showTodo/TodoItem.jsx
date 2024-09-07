import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { PlusCircle, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import ModalBox from "../common/ModalBox";
import ModalContent from "./ModalContent";
import { saveTodo } from "../../utils/persistance";

const TodoItem = ({ todo, todos, setTodos, depth = 0 , fontStyle, fontColor }) => {
  const { id, title, subItems, isCompleted } = todo;

  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => {
    setIsOpen(false);
  };

  // Calculate progress (percentage of completed sub-items)
  const calculateProgress = (items) => {
    const completedItems = items.filter((item) => item.isCompleted).length;
    const totalItems = items.length;
    return totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  };

  const progress = calculateProgress(subItems);

  const handleExpandClick = () => setExpanded(!expanded);

  const handleSubItem = (data) => {
    const newSubItem = {
      id: uuidv4(),
      title: data.title,
      isCompleted: false,
      subItems: []
    };

    const updatedTodos = updateTodoRecursively(todos, id, (item) => ({
      ...item,
      subItems: [...item.subItems, newSubItem]
    }));
    
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
    setIsOpen(false);
  };

  const handleEditTodo = () => {
    const newTitle = prompt("Edit Todo", title);
    if (newTitle) {
      const updatedTodos = updateTodoRecursively(todos, id, (item) => ({
        ...item,
        title: newTitle
      }));
      setTodos(updatedTodos);
      saveTodo(updatedTodos);
    }
  };

  const handleDeleteTodo = () => {
    const updatedTodos = deleteTodoRecursively(todos, id);
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };

  const handleToggleTodo = () => {
    const updatedTodos = updateTodoRecursively(todos, id, (item) => ({
      ...item,
      isCompleted: !item.isCompleted
    }));
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };

  // Recursive helper functions
  const updateTodoRecursively = (todoItems, targetId, updateFn) => {
    return todoItems.map((item) => {
      if (item.id === targetId) {
        return updateFn(item);
      }
      if (item.subItems.length > 0) {
        return {
          ...item,
          subItems: updateTodoRecursively(item.subItems, targetId, updateFn)
        };
      }
      return item;
    });
  };

  const deleteTodoRecursively = (todoItems, targetId) => {
    return todoItems.filter((item) => item.id !== targetId)
      .map((item) => ({
        ...item,
        subItems: deleteTodoRecursively(item.subItems, targetId)
      }));
  };

  //Drag and Drop functions start from here
  

  return (
    <div className={`bg-gray-${200 - depth * 20} dark:bg-gray-${700 + depth * 20} p-4 rounded-lg shadow-md ml-${depth * 4}`}>
      {depth < 2 && (
        <ModalBox isOpen={isOpen} onClose={onCloseModal}>
          <ModalContent
            onclose={onCloseModal}
            submitFun={(data) => handleSubItem(data)}
          />
        </ModalBox>
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <input 
            type="checkbox" 
            className="rounded" 
            checked={isCompleted}
            onChange={handleToggleTodo}
          />
          <h2  style={{ fontFamily: fontStyle, color: fontColor }} className={`text-${2 - depth}xl font-semibold text-gray-800 dark:text-gray-200`}>
            {title}
          </h2>
        </div>
        <div className="flex items-center">
          <div className="mr-4 text-gray-600 dark:text-gray-400">
            {subItems.length > 0 && (
              <span>{Math.round(progress)}% completed</span>
            )}
          </div>
          {depth < 2 && (
            <button
              className="text-green-600 dark:text-green-400"
              onClick={() => setIsOpen(true)}
            >
              <PlusCircle size={20} />
            </button>
          )}
          <button
            className="text-blue-600 dark:text-blue-400 ml-3"
            onClick={handleEditTodo}
          >
            <Edit size={20} />
          </button>
          <button
            className="text-red-600 dark:text-red-400 ml-3"
            onClick={handleDeleteTodo}
          >
            <Trash2 size={20} />
          </button>
          {subItems.length > 0 && (
            <button className="ml-3" onClick={handleExpandClick}>
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}
        </div>
      </div>

      {expanded && (
        <div className="ml-6 mt-4 space-y-4">
          {subItems.map((subItem) => (
            <TodoItem
              key={subItem.id}
              todo={subItem}
              todos={todos}
              setTodos={setTodos}
              depth={depth + 1}
              fontStyle={fontStyle} 
              fontColor={fontColor}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;