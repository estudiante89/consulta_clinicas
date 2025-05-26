
export interface User {
  _id?: string;
  nombre: string;
  correo: string;
  password?: string;
  rol: 'admin' | 'medico' | 'paciente';
}
