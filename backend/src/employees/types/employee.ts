export type EmployeeDepartment = {
  id: string;
  nombre: string;
  ubicacion: string | null;
};

export type Employee = {
  id: string;
  nombre: string;
  email: string;
  id_departamento: string;
  estado: 'ACTIVO' | 'CESADO' | 'SUSPENDIDO';
  fecha_inicio: string;
  fecha_fin: string | null;
  created_at: string;
  updated_at: string;
  departamento?: EmployeeDepartment | null;
};

