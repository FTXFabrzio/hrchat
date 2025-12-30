import { IsNumber, IsOptional, IsString, Matches, Min } from 'class-validator';

export class UpdateDepartmentDto {
  @IsOptional()
  @IsString()
  @Matches(/^[\p{L}\s]+$/u, {
    message: 'nombre must contain only letters and spaces',
  })
  nombre?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string | null;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  presupuesto?: number | null;
}
