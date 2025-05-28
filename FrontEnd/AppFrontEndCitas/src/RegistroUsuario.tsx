import React, { useState } from 'react';

type RegistroUsuarioProps = {
  onVolver: () => void;
};

function RegistroUsuario({ onVolver }: RegistroUsuarioProps) {
  const [data, setData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [password, setPassword] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [rol, setRol] = useState<string>('usuario');
  const [idUsuario, setIdUsuario] = useState<number>(0);
  const [fechaRegistro, setFechaRegistro] = useState<string>('');
  const [activo, setActivo] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const userData = {
      password,
      nombre,
      email,
      rol,
      idUsuario,
      fechaRegistro,
      activo,
    };

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      console.log("Datos enviados:", result);
    } catch (err: any) {
      console.error("Error:", err);
      setError(`No se pudieron enviar los datos: ${err.message || 'Error desconocido'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-gray-100 p-4 font-sans">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Registro de Usuario
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Juan Pérez"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="juan.perez@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>

          <div>
            <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
              Rol:
            </label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="usuario">Usuario</option>
              <option value="administrador">Administrador</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          <div>
            <label htmlFor="idUsuario" className="block text-sm font-medium text-gray-700 mb-1">
              ID de Usuario:
            </label>
            <input
              type="number"
              id="idUsuario"
              value={idUsuario}
              onChange={(e) => setIdUsuario(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="1"
            />
          </div>

          <div>
            <label htmlFor="fechaRegistro" className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de Registro:
            </label>
            <input
              type="datetime-local"
              id="fechaRegistro"
              value={fechaRegistro}
              onChange={(e) => setFechaRegistro(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="md:col-span-2 flex items-center mt-2">
            <input
              type="checkbox"
              id="activo"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="activo" className="ml-2 block text-sm text-gray-900">
              Activo
            </label>
          </div>
        </div>

        <button
          onClick={fetchData}
          className={`
            px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 ease-in-out
            ${isLoading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'}
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          `}
          disabled={isLoading}
        >
          {isLoading ? 'Enviando datos...' : 'Registrar Usuario'}
        </button>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 min-h-[80px] flex flex-col items-center justify-center text-sm break-all">
          {error && <p className="text-red-600 font-medium">{error}</p>}
          {!error && isLoading && <p className="text-gray-500">Esperando respuesta del servidor...</p>}
          {!error && !isLoading && data && (
            <p className="text-green-700 font-semibold text-left w-full">
              Datos enviados exitosamente (respuesta del backend):
            </p>
          )}
          {!error && !isLoading && !data && (
            <p className="text-gray-500">Rellena los campos y haz clic en el botón para registrar.</p>
          )}
        </div>

        {/* Botón de regreso al menú */}
        <button
          onClick={onVolver}
          className="mt-6 px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white rounded-lg transition-all duration-300"
        >
          Regresar al Menú
        </button>
      </div>
    </div>
  );
}

export default RegistroUsuario;
