// Updated 404 page using Tailwind CSS for styling
import React from 'react';
import { Link } from 'react-router-dom';

// Ensure 'react-router-dom' is installed
// Ensure Tailwind CSS is installed and configured in your project

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page not found</h1>
      <p className="mb-8 text-gray-600">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600">
        Go to home
      </Link>
    </div>
  );
};