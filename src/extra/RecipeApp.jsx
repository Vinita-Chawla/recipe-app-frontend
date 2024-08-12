import React, { useState } from 'react';

function RecipeApp() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center bg-[#feecde] h-[100vh] recipe_banner">
      
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold mb-4"> Pick Your Perfect Plan!</h1>
        <h5 className='mb-4'>Unlock Your Cooking Experience</h5>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
        >
          Start Your Journey
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg relative w-1/2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Subscription Plans</h2>
            <p className="mb-4">Choose a plan that fits your needs:</p>
            <ul className="list-disc list-inside mb-4">
              <li>Plan A: $10/month</li>
              <li>Plan B: $20/month</li>
              <li>Plan C: $30/month</li>
            </ul>
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition-all"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecipeApp;
