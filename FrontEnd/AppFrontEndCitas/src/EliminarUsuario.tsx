import React, { useState } from 'react';

interface EliminarUsuarioProps {
  onRegresar: () => void;
}

const EliminarUsuario: React.FC<EliminarUsuarioProps> = ({ onRegresar }) => {
  const [id, setId] = useState('');
  const [usuario, setUsuario] = useState<any | null>(null);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  const buscarUsuario = async () => {
    try {
      setError('');
      const res = await fetch(`http://localhost:3000/api/usuarios/${id}`);
      if (!res.ok) throw new Error('Usuario no encontrado');
      const data = await res.json();
      setUsuario(data);
    } catch (err: any) {
      setError(err.message);
      setUsuario(null);
    }
  };

  const eliminarUsuario = async () => {
    try {
      await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'DELETE',
      });
      setMensaje('Usuario eliminado correctamente');
      setUsuario(null);
      setId('');
    } catch (err: any) {
      setError('Error al eliminar usuario');
    }
  };

  const cancelar = () => {
    setId('');
    setUsuario(null);
    setMensaje('');
    setError('');
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Eliminar Usuario</h2>

      <input
        type="text"
        placeholder="Ingrese ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-4"
      />
      <button
        onClick={buscarUsuario}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-4 hover:bg-blue-700"
      >
        Buscar Usuario
      </button>

      {error && <p className="text-red-600">{error}</p>}
      {mensaje && <p className="text-green-600">{mensaje}</p>}

      {usuario && (
        <div className="text-left mt-4 mb-6 bg-gray-100 p-4 rounded-lg">
          <p><strong>ID:</strong> {usuario.idUsuario}</p>
          <p><strong>Nombre:</strong> {usuario.nombre}</p>
          <p><strong>Email:</strong> {usuario.email}</p>
          <p><strong>Rol:</strong> {usuario.rol}</p>
        </div>
      )}

      <div className="space-x-4 mt-6">
        {usuario && (
          <button
            onClick={eliminarUsuario}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Eliminar
          </button>
        )}
        <button
          onClick={cancelar}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Cancelar
        </button>
        <button
          onClick={onRegresar}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Regresar
        </button>
      </div>
    </div>
  );
};

export default EliminarUsuario;
