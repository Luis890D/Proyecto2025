import React, { useState } from 'react';
import RegistroUsuario from './RegistroUsuario';
import EliminarUsuario from './EliminarUsuario';
import ModificarUsuario from './ModificarUsuario';

interface AppProps {
  onVolver: () => void;
}

function App({ onVolver }: AppProps) {
  const [view, setView] = useState<'home' | 'agendar' | 'modificar' | 'eliminar'>('home');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      {/* Botón de regreso al menú principal */}
      <div className="self-start mb-4">
        <button
          onClick={onVolver}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
        >
          ← Regresar
        </button>
      </div>

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
      {view === 'modificar' && <ModificarUsuario onVolver={() => setView('home')} />}
      {view === 'eliminar' && <EliminarUsuario onRegresar={() => setView('home')} />}
    </div>
  );
}

export default App;
