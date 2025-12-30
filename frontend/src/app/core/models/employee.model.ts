export type EmployeeDepartment = {
  id: string;
  nombre: string;
  ubicacion: string | null;
};

export type EmployeeStatus = 'ACTIVO' | 'CESADO' | 'SUSPENDIDO';

export type Employee = {
  id: string;
  nombre: string;
  email: string;
  id_departamento: string;
  estado: EmployeeStatus;
  fecha_inicio: string;
  fecha_fin: string | null;
  departamento?: EmployeeDepartment | null;
};

