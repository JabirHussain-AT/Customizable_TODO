import React from 'react';
import ThemeToggle from './components/common/ThemeToggle';

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      <header className="p-4">
        <h1 className="text-3xl">Nested To-Do List</h1>
        <ThemeToggle />
      </header>
      {/* Your To-Do List Component */}
    </div>
  );
};

export default App;
