// types/vistas.ts
export interface VistaProfesional {
  profesional_id: number;
  DPI: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  celular: string;
  especialidad: string;
  consultorio: string;
  nombre_user: string;
  estado_profesional: boolean;
}

export interface VistaAsistente {
  asistente_id: number;
  DPI: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  celular: string;
  nombre_user: string;
  estado_asistente: boolean;
}
// types/vistas.ts
export interface VistaProfesional {
  profesional_id: number;
  DPI: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  celular: string;
  especialidad: string;
  consultorio: string;
  nombre_user: string;
  estado_profesional: boolean;
}

export interface VistaAsistente {
  asistente_id: number;
  DPI: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  celular: string;
  nombre_user: string;
  estado_asistente: boolean;
}

export interface VistaCliente {
  cliente_id: number;
  DPI: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  email: string;
  telefono: string;
  celular: string;
  estado_cliente: boolean;
}

// ... más interfaces según sea necesario

// ... más interfaces para las otras vistas