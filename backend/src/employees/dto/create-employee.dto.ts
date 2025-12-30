import {
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'nombre must contain only letters and spaces',
  })
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  id_departamento: string;

  @IsOptional()
  @IsIn(['ACTIVO', 'CESADO', 'SUSPENDIDO'])
  estado?: 'ACTIVO' | 'CESADO' | 'SUSPENDIDO';

  @IsOptional()
  @IsDateString()
  fecha_inicio?: string;

  @IsOptional()
  @IsDateString()
  fecha_fin?: string | null;
}
