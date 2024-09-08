import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, Layers, HardDrive } from 'lucide-react';
import FeatureCard from '../components/home/FeatureCard';

//static features added for more better feel
const features = [
  {
    icon: CheckSquare,
    title: "Create Tasks",
    description: "Easily create nested to-do tasks, manage their priority, and keep your life organized.",
    delay: 0.1
  },
  {
    icon: Layers,
    title: "Indentation",
    description: "Indent and outdent tasks to create a nested structure, making your lists more manageable.",
    delay: 0.3
  },
  {
    icon: HardDrive,
    title: "Persistent Storage",
    description: "Never lose your tasks! All your lists are saved locally and persist even after page reloads.",
    delay: 0.5
  }
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 text-white flex flex-col items-center justify-center transition-colors duration-500">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-12">
        <h1 className=" text-3xl md:text-5xl font-bold animate-fade-in dark:text-gray-100 pt-8 md:pt-2">Welcome to the Nested To-Do List</h1>
        <p className="text-xl animate-fade-in text-white/80 dark:text-gray-300">
          Organize your tasks effortlessly with our awesome nested to-do list application!
        </p>
        
        {/* Buttons */}
        <div className="space-x-4 font-serif">
          <button 
            onClick={() => navigate('/show-todos')} 
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            View Todo List
          </button>
          <button className="px-6 py-2 bg-transparent border border-white hover:bg-white hover:text-purple-700 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 dark:border-gray-400 dark:hover:bg-gray-400 dark:hover:text-gray-900">
            Learn More
          </button>
        </div>
      </div>

      {/* Feature Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl px-4 md:px-0 pb-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={feature.delay}
          />
        ))}
      </div>
      
    </div>
  );
};

export default Home;