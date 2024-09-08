import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  PlusCircle,
  Edit,
  Trash2,
  ChevronDown,
  ChevronUp,
  GripVertical,
  MoreVertical,
} from "lucide-react";
import ModalBox from "../common/ModalBox";
import ModalContent from "./ModalContent";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import { saveTodo } from "../../utils/persistance";
import { IconPickerItem } from "react-icons-picker";
import { calculateProgress } from "../../utils/helpers";

const TodoItem = ({
  todo,
  todos,
  setTodos,
  depth = 0,
  fontStyle,
  fontColor,
}) => {

    //destructuring elements
  const { id, title, subItems, isCompleted, icon } = todo;

  //managing states
  const [expanded, setExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // For mobile options menu

  //here it is the helpers fo dnd drag and drop component
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  //for closing the modal
  const onCloseModal = () => {
    setIsOpen(false);
  };


  //here we are checking the progress for showing using a utility function
  const progress = calculateProgress(subItems);

  const handleExpandClick = () => setExpanded(!expanded);

  //submiting sub item
  const handleSubItem = (data) => {
    const newSubItem = {
      id: uuidv4(),
      title: data.title,
      isCompleted: false,
      subItems: [],
      icon : data.icon
    };

    const updatedTodos = updateTodoRecursively(todos, id, (item) => ({
      ...item,
      subItems: [...item.subItems, newSubItem],
    }));

    setTodos(updatedTodos);
    saveTodo(updatedTodos);
    setIsOpen(false);
  };


  //handling editing
  const handleEditTodo = () => {
    const newTitle = prompt("Edit Todo", title);
    if (newTitle) {
      const updatedTodos = updateTodoRecursively(todos, id, (item) => ({
        ...item,
        title: newTitle,
      }));
      setTodos(updatedTodos);
      saveTodo(updatedTodos);
    }
  };

//   handling deleting a todo 
  const handleDeleteTodo = () => {
    const updatedTodos = deleteTodoRecursively(todos, id);
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };


//   controlling todo toggle 
  const handleToggleTodo = () => {
    const updatedTodos = updateTodoRecursively(todos, id, (item) => ({
      ...item,
      isCompleted: !item.isCompleted,
    }));
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };


//   recusive methords for nested lists 
  const updateTodoRecursively = (todoItems, targetId, updateFn) => {
    return todoItems.map((item) => {
      if (item.id === targetId) {
        return updateFn(item);
      }
      if (item.subItems.length > 0) {
        return {
          ...item,
          subItems: updateTodoRecursively(item.subItems, targetId, updateFn),
        };
      }
      return item;
    });
  };

  const deleteTodoRecursively = (todoItems, targetId) => {
    return todoItems
      .filter((item) => item.id !== targetId)
      .map((item) => ({
        ...item,
        subItems: deleteTodoRecursively(item.subItems, targetId),
      }));
  };


  //fixing the drop end of dnd 
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const updatedTodos = moveTodo(todos, activeId, overId);
    setTodos(updatedTodos);
    saveTodo(updatedTodos);
  };


  //move setting function 
  const moveTodo = (todoItems, activeId, overId) => {
    const activeItem = findTodoById(todoItems, activeId);

    const itemsWithoutActive = removeItem(todoItems, activeId);

    return insertItem(itemsWithoutActive, overId, activeItem);
  };

  const findTodoById = (todoItems, id) => {
    for (const item of todoItems) {
      if (item.id === id) return item;
      const foundInSub = findTodoById(item.subItems, id);
      if (foundInSub) return foundInSub;
    }
    return null;
  };

  const removeItem = (items, id) => {
    return items.reduce((acc, item) => {
      if (item.id === id) return acc;
      if (item.subItems.length > 0) {
        return [...acc, { ...item, subItems: removeItem(item.subItems, id) }];
      }
      return [...acc, item];
    }, []);
  };

  const insertItem = (items, id, itemToInsert) => {
    return items.map((item) => {
      if (item.id === id) {
        return { ...item, subItems: [...item.subItems, itemToInsert] };
      }
      if (item.subItems.length > 0) {
        return {
          ...item,
          subItems: insertItem(item.subItems, id, itemToInsert),
        };
      }
      return item;
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-gray-${200 - depth * 20} dark:bg-gray-${
        700 + depth * 20
      } p-4 rounded-lg shadow-md ml-${depth * 4} cursor-pointer`}
    >
      {depth < 2 && (
        <ModalBox isOpen={isOpen} onClose={onCloseModal}>
          <ModalContent
            onclose={onCloseModal}
            submitFun={(data) => handleSubItem(data)}
          />
        </ModalBox>
      )}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <span {...listeners} className="cursor-grab">
            <GripVertical
              size={20}
              className="text-gray-500 dark:text-gray-400"
            />
          </span>

          <input
            type="checkbox"
            className="rounded"
            checked={isCompleted}
            onChange={handleToggleTodo}
          />
          <div
            style={{ fontFamily: fontStyle, color: fontColor }}
            className={`text-${
              2 - depth
            }xl font-semibold text-gray-800 dark:text-gray-20 flex items-center gap-4 `}
          >
            <span
              className={`${
                isCompleted ? "line-through" : ""
              } text-xl md:text-3xl `}
            >
              {title}
            </span>{" "}
            <IconPickerItem className="text-lg md:text-2xl" value={icon} />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {subItems.length > 0 && (
            <div className="text-gray-600 dark:text-gray-400 hidden md:block">
              {Math.round(progress)}% completed
            </div>
          )}

          {subItems.length > 0 && (
            <button className="ml-3" onClick={handleExpandClick}>
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}

          <div className="relative md:hidden">
            <button onClick={() => setShowOptions(!showOptions)}>
              <MoreVertical size={20} />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 shadow-lg rounded-lg">
                {depth < 2 && (
                  <button
                    className="block w-full text-left px-4 py-2 text-green-600 dark:text-green-400"
                    onClick={() => setIsOpen(true)}
                  >
                    <PlusCircle size={20} className="inline" /> Add SubItem
                  </button>
                )}
                <button
                  className="block w-full text-left px-4 py-2 text-blue-600 dark:text-blue-400"
                  onClick={handleEditTodo}
                >
                  <Edit size={20} className="inline" /> Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400"
                  onClick={handleDeleteTodo}
                >
                  <Trash2 size={20} className="inline" /> Delete
                </button>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {depth < 2 && (
              <button
                className="text-green-600 dark:text-green-400"
                onClick={() => setIsOpen(true)}
              >
                <PlusCircle size={20} />
              </button>
            )}
            <button
              className="text-blue-600 dark:text-blue-400"
              onClick={handleEditTodo}
            >
              <Edit size={20} />
            </button>
            <button
              className="text-red-600 dark:text-red-400"
              onClick={handleDeleteTodo}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {expanded && subItems.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={subItems}
            strategy={verticalListSortingStrategy}
          >
            <div className="mt-3 ml-6 space-y-3">
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
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TodoItem;
