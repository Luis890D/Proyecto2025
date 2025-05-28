import React, { useState } from 'react';
import RegistroUsuario from './RegistroUsuario';
import EliminarUsuario from './EliminarUsuario';

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

      {view === 'agendar' && <RegistroUsuario onVolver={() => setView('home')} />}
      {view === 'modificar' && (
        <div className="text-center space-y-4">
          <p className="text-lg">Aquí irá la vista para modificar citas (pendiente)</p>
          <button
            onClick={() => setView('home')}
            className="mt-4 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Regresar al menú
          </button>
        </div>
      )}
      {view === 'eliminar' && <EliminarUsuario onRegresar={() => setView('home')} />}
    </div>
  );
}

export default App;
