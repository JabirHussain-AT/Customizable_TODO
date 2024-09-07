import { useState } from "react";
import { PlusCircle, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";

const TodoItem = ({ title, subItems }) => {
  const [expanded, setExpanded] = useState(false);
  const [todos, setTodos] = useState(subItems);

  // Calculate progress (percentage of completed sub-items)
  const completedSubTasks = todos.filter((todo) =>
    todo.subItems.every((sub) => sub.completed)
  ).length;
  const totalSubTasks = todos.length;
  const progress =
    totalSubTasks > 0 ? (completedSubTasks / totalSubTasks) * 100 : 0;

  const handleExpandClick = () => setExpanded(!expanded);

  const handleAddSubItem = (index) => {
    // Logic to add a sub-item
    const newSubItem = { text: "New SubItem", completed: false, subItems: [] };
    const updatedTodos = [...todos];
    updatedTodos[index].subItems = [...updatedTodos[index].subItems, newSubItem];
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = prompt("Edit Todo", updatedTodos[index].text);
    setTodos(updatedTodos);
  };

  const handleEditSubTodo = (todoIndex, subIndex) => {
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].subItems[subIndex].text = prompt(
      "Edit Sub Todo",
      updatedTodos[todoIndex].subItems[subIndex].text
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleDeleteSubTodo = (todoIndex, subIndex) => {
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].subItems = updatedTodos[todoIndex].subItems.filter(
      (_, i) => i !== subIndex
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <input type="checkbox" className="rounded" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h2>
        </div>
        <div className="flex items-center">
          {/* Show progress on the right side of the main todo */}
          <div className="mr-4 text-gray-600 dark:text-gray-400">
            {totalSubTasks > 0 && (
              <span>{Math.round(progress)}% completed</span>
            )}
          </div>
          <button
            className="text-green-600 dark:text-green-400"
            onClick={() => handleAddSubItem(-1)}
          >
            <PlusCircle size={20} />
          </button>
          <button
            className="text-blue-600 dark:text-blue-400 ml-3"
            onClick={() => handleEditTodo()}
          >
            <Edit size={20} />
          </button>
          <button
            className="text-red-600 dark:text-red-400 ml-3"
            onClick={() => handleDeleteTodo()}
          >
            <Trash2 size={20} />
          </button>
          {todos?.length > 0 && (
            <button className="ml-3" onClick={handleExpandClick}>
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          )}
        </div>
      </div>

      {/* Expand sub-items */}
      {expanded && (
        <div className="ml-6 mt-4 space-y-4">
          {todos.map((todo, todoIndex) => (
            <div key={todoIndex} className="flex flex-col space-y-2">
              {/* Sub-item */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => {
                      const updatedTodos = [...todos];
                      updatedTodos[todoIndex].completed =
                        !updatedTodos[todoIndex].completed;
                      setTodos(updatedTodos);
                    }}
                    className="mr-2"
                  />
                  <span className={todo.completed ? "line-through" : ""}>
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-green-600 dark:text-green-400"
                    onClick={() => handleAddSubItem(todoIndex)}
                  >
                    <PlusCircle size={16} />
                  </button>
                  <button
                    className="text-blue-600 dark:text-blue-400 ml-3"
                    onClick={() => handleEditTodo(todoIndex)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="text-red-600 dark:text-red-400 ml-3"
                    onClick={() => handleDeleteTodo(todoIndex)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Expand sub-sub-items */}
              {todo.subItems.length > 0 && (
                <div className="ml-6">
                  {todo.subItems.map((sub, subIndex) => (
                    <div
                      key={subIndex}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <input
                          type="checkbox"
                          checked={sub.completed}
                          onChange={() => {
                            const updatedTodos = [...todos];
                            updatedTodos[todoIndex].subItems[subIndex].completed =
                              !updatedTodos[todoIndex].subItems[subIndex]
                                .completed;
                            setTodos(updatedTodos);
                          }}
                          className="mr-2"
                        />
                        <span className={sub.completed ? "line-through" : ""}>
                          {sub.text}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <button
                          className="text-blue-600 dark:text-blue-400"
                          onClick={() =>
                            handleEditSubTodo(todoIndex, subIndex)
                          }
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-600 dark:text-red-400 ml-3"
                          onClick={() =>
                            handleDeleteSubTodo(todoIndex, subIndex)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
