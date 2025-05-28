import React from 'react';

// Define las props que el componente Menu recibirá
interface MenuProps {
  // setCurrentPage es una función que toma un string y no devuelve nada (void)
  setCurrentPage: (page: string) => void;
  // currentPage es el string que representa la página actual
  currentPage: string;
}

// Componente funcional Menu que recibe las props definidas
const Menu: React.FC<MenuProps> = ({ setCurrentPage, currentPage }) => {
  return (
    // Barra de navegación con estilos de Tailwind CSS
    <nav className="bg-indigo-700 p-4 shadow-md">
      <div className="container mx-auto flex justify-center space-x-4">
        {/* Botón para la página 'Agendar' */}
        <button
          onClick={() => setCurrentPage('agendar')} // Al hacer clic, cambia la página a 'agendar'
          className={`
            px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200
            ${currentPage === 'agendar' ? 'bg-indigo-500' : 'hover:bg-indigo-600'}
          `}
        >
          Agendar
        </button>
        {/* Botón para la página 'Modificar Cita' */}
        <button
          onClick={() => setCurrentPage('modificar')} // Al hacer clic, cambia la página a 'modificar'
          className={`
            px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200
            ${currentPage === 'modificar' ? 'bg-indigo-500' : 'hover:bg-indigo-600'}
          `}
        >
          Modificar Cita
        </button>
        {/* Botón para la página 'Cancelar Cita' */}
        <button
          onClick={() => setCurrentPage('cancelar')} // Al hacer clic, cambia la página a 'cancelar'
          className={`
            px-6 py-2 rounded-lg text-white font-semibold transition-colors duration-200
            ${currentPage === 'cancelar' ? 'bg-indigo-500' : 'hover:bg-indigo-600'}
          `}
        >
          Cancelar Cita
        </button>
      </div>
    </nav>
  );
};

export default Menu;