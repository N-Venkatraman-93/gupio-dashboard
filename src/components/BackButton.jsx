// src/components/BackButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className="mb-4 px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 dark:text-white text-black rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
            ← Back
        </button>
    );
};

export default BackButton;
