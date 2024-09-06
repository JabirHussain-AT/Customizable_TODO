import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition duration-500 hover:scale-105 hover:shadow-xl group"
    style={{ animation: `fadeIn 0.5s ease-out ${delay}s both` }}
  >
    <div className="flex items-center mb-4">
      <Icon className="w-8 h-8 mr-3 text-purple-600 dark:text-purple-400 group-hover:text-pink-500 transition-colors duration-300" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-pink-500 transition-colors duration-300">{title}</h2>
    </div>
    <p className="mt-2 text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

export default FeatureCard;