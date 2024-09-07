import React, { useState } from "react";
import TodoItem from "../components/showTodo/TodoItem";
import { List } from "lucide-react";

const ShowToDo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500  to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-12 px-4 transition-colors duration-300 ">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8 transition-colors duration-300">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white flex items-center mb-8">
              <List
                size={32}
                className="mr-3 text-purple-600 dark:text-purple-400"
              />
              My Todo Lists
            </h1>
            <button className=" py-1 px-6 rounded-md m-4  hover:bg-violet-500 bg-violet-400 text-white font-bold font-sans"> Add Todo + </button>
          </div>
          <div className="space-y-6">
            <TodoItem
              title="Work Projects"
              subItems={[
                {
                  text: "Project Alpha",
                  subItems: [
                    { text: "Design mockups", completed: true },
                    { text: "Frontend implementation", completed: true },
                    { text: "Backend API", completed: false },
                  ],
                },
                {
                  text: "Project Beta",
                  subItems: [
                    { text: "Client meeting", completed: true },
                    { text: "Requirements gathering", completed: false },
                  ],
                },
              ]}
            />

            <TodoItem
              title="Personal Goals"
              subItems={[
                {
                  text: "Health & Fitness",
                  subItems: [
                    { text: "Morning yoga", completed: false },
                    { text: "Meal prep for the week", completed: true },
                  ],
                },
                {
                  text: "Learning",
                  subItems: [
                    { text: "Finish React course", completed: false },
                    {
                      text: "Start machine learning project",
                      completed: false,
                    },
                  ],
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowToDo;
