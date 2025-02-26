import React from "react";
import { Star, Calendar, Puzzle } from "lucide-react";

const Alert = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        {}
        <h2 className="text-xl font-semibold text-gray-800">¡Alerta!</h2>

        <p className="text-gray-600 mt-2">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-pink-400 text-white px-4 py-2 rounded-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default Alert;
