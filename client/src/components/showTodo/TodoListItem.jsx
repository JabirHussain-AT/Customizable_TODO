import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Pencil, Trash2, MoreVertical } from 'lucide-react';

const TodoListItem = ({ text, subItems = [], theme }) => {
    const [showSubItems, setShowSubItems] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
  
    const completedSubItems = subItems.filter(item => item.completed).length;
    const progress = subItems.length > 0 ? (completedSubItems / subItems.length) * 100 : 0;
  
    return (
      <div className={`border dark:border-gray-700 rounded-lg p-4 ${isCompleted ? 'bg-green-50 dark:bg-green-900' : 'bg-white dark:bg-gray-800'} transition-colors duration-200`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-grow">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
              className="w-5 h-5 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              onClick={() => setShowSubItems(!showSubItems)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition duration-200"
            >
              {showSubItems ? (
                <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>
            <span className={`text-lg ${isCompleted ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-white'}`}>{text}</span>
          </div>
          <div className="flex items-center space-x-2">
            {subItems.length > 0 && (
              <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5 mr-2">
                <div className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>
            )}
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition duration-200 md:block hidden">
              <Pencil className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition duration-200 md:block hidden">
              <Trash2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition duration-200 md:hidden">
              <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>
        {showSubItems && (
          <div className="ml-8 mt-3 space-y-2">
            {subItems.map((subItem, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={subItem.completed}
                    onChange={() => {
                      subItem.completed = !subItem.completed;
                      setShowSubItems(show => !show);
                      setShowSubItems(show => !show);
                    }}
                    className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
                  />
                  <span className={`${subItem.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
                    {subItem.text}
                  </span>
                </div>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition duration-200">
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };


  export default TodoListItem