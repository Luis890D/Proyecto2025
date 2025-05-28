import React, { useState } from 'react';
import RegistroUsuario from './RegistroUsuario'; // Este será el componente actual de registro

function App() {
  const [view, setView] = useState<'home' | 'agendar' | 'modificar' | 'eliminar'>('home');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      {view === 'home' && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Bienvenido</h1>
          <button
            onClick={() => setView('agendar')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full"
          >
            Agendar Cita
          </button>
          <button
            onClick={() => setView('modificar')}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 w-full"
          >
            Modificar
          </button>
          <button
            onClick={() => setView('eliminar')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 w-full"
          >
            Eliminar
          </button>
        </div>
      )}

      {view === 'agendar' && (
        <RegistroUsuario onVolver={() => setView('home')} />
      )}

      {view === 'modificar' && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-lg font-semibold text-gray-700">
            Aquí irá la vista para modificar citas (pendiente)
          </p>
          <button
            onClick={() => setView('home')}
            className="mt-6 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-300"
          >
            Regresar al Menú
          </button>
        </div>
      )}

      {view === 'eliminar' && (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <p className="text-lg font-semibold text-gray-700">
            Aquí irá la vista para eliminar citas (pendiente)
          </p>
          <button
            onClick={() => setView('home')}
            className="mt-6 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-300"
          >
            Regresar al Menú
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
