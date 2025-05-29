import React, { useState, useEffect } from 'react';

interface ModificarUsuarioProps {
  onVolver: () => void;
}

function ModificarUsuario({ onVolver }: ModificarUsuarioProps) {
  const [id, setId] = useState<number>(0);
  const [usuario, setUsuario] = useState<any | null>(null);
  const [nuevaFecha, setNuevaFecha] = useState<string>('');
  const [mensajeError, setMensajeError] = useState<string>('');
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState<string>('');

  const obtenerUsuario = async () => {
    setMensajeError('');
    setMensajeConfirmacion('');
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`);
      if (!response.ok) throw new Error('Usuario no encontrado');
      const data = await response.json();
      setUsuario(data);
      setNuevaFecha(data.fechaRegistro || '');
    } catch (err: any) {
      setUsuario(null);
      setMensajeError(err.message);
    }
  };

  const handleGuardar = async () => {
    if (!nuevaFecha) {
      setMensajeError('Debes ingresar una fecha');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fechaRegistro: nuevaFecha }),
      });

      if (!response.ok) throw new Error('No se pudo actualizar');

      setMensajeConfirmacion('¡Cita modificada correctamente!');
      setMensajeError('');
    } catch (err) {
      setMensajeError('Error al guardar los cambios');
      setMensajeConfirmacion('');
    }
  };

  const handleCancelar = () => {
    setUsuario(null);
    setId(0);
    setNuevaFecha('');
    setMensajeError('');
    setMensajeConfirmacion('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-svh bg-gray-100 p-4 font-sans">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Modificar Cita</h2>

        {!usuario && (
          <>
            <label htmlFor="idUsuario" className="block text-sm font-medium text-gray-700 mb-1">
              Ingrese ID de usuario:
            </label>
            <input
              type="number"
              id="idUsuario"
              value={id}
              onChange={(e) => setId(Number(e.target.value))}
              className="w-full px-4 py-2 border rounded mb-4"
              placeholder="Ej. 1"
            />
            <button
              onClick={obtenerUsuario}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            >
              Buscar Usuario
            </button>
          </>
        )}

        {usuario && (
          <div className="space-y-4">
            <p className="text-gray-700">
              <strong>Nombre:</strong> {usuario.nombre}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {usuario.email}
            </p>
            <label htmlFor="fechaRegistro" className="block text-sm font-medium text-gray-700 mb-1">
              Nueva Fecha y Hora:
            </label>
            <input
              type="datetime-local"
              id="fechaRegistro"
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />

            <div className="flex justify-between space-x-2 pt-4">
              <button
                onClick={handleGuardar}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 w-full"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancelar}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 w-full"
              >
                Cancelar
              </button>
              <button
                onClick={onVolver}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 w-full"
              >
                Regresar
              </button>
            </div>
          </div>
        )}

        {(mensajeError || mensajeConfirmacion) && (
          <div className="mt-4 text-center">
            {mensajeError && <p className="text-red-600">{mensajeError}</p>}
            {mensajeConfirmacion && <p className="text-green-600">{mensajeConfirmacion}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ModificarUsuario;
