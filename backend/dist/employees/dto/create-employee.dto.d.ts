export declare class CreateEmployeeDto {
    nombre: string;
    email: string;
    id_departamento: string;
    estado?: 'ACTIVO' | 'CESADO' | 'SUSPENDIDO';
    fecha_inicio?: string;
    fecha_fin?: string | null;
}
