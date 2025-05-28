import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

function Main() {
  const [role, setRole] = useState<'none' | 'usuario' | 'profesional'>('none');

  if (role === 'none') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 font-sans">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Seleccione su tipo de usuario</h1>
        <button
          onClick={() => setRole('usuario')}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-64"
        >
          Usuario
        </button>
        <button
          onClick={() => setRole('profesional')}
          className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 w-64"
        >
          Profesional
        </button>
      </div>
    );
  }

  if (role === 'usuario') {
    return <App onVolver={() => setRole('none')} />;
  }

  if (role === 'profesional') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 font-sans space-y-6">
        <div className="self-start pl-4">
          <button
            onClick={() => setRole('none')}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
          >
            ← Inicio
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Vista para Profesionales</h1>
        <p className="text-lg text-gray-700">En construcción...</p>
      </div>
    );
  }

  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
