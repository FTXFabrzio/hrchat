create extension if not exists "pgcrypto";

create table if not exists departamentos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  ubicacion text null,
  presupuesto numeric(14,2) null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create unique index if not exists departamentos_nombre_unique
  on departamentos (lower(nombre));

create table if not exists empleados (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  email text not null,
  id_departamento uuid not null references departamentos(id) on delete restrict,
  estado text default 'ACTIVO' check (estado in ('ACTIVO', 'CESADO', 'SUSPENDIDO')),
  fecha_inicio date default current_date,
  fecha_fin date null,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  check (fecha_fin is null or fecha_fin >= fecha_inicio)
);

create unique index if not exists empleados_email_unique
  on empleados (lower(email));

