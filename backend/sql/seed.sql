insert into departamentos (nombre, ubicacion, presupuesto)
values
  ('Ventas', 'Sede Norte', 50000),
  ('Tecnologia', 'Sede Principal', 75000),
  ('Administracion', 'Sede Sur', 60000)
on conflict do nothing;

with dept as (
  select id, nombre from departamentos
)
insert into empleados (nombre, email, id_departamento, estado)
select 'Juan Perez', 'juan.perez@empresa.com', dept.id, 'ACTIVO'
from dept where dept.nombre = 'Ventas'
on conflict do nothing;

with dept as (
  select id, nombre from departamentos
)
insert into empleados (nombre, email, id_departamento, estado)
select 'Juan Rivera', 'juan.rivera@empresa.com', dept.id, 'ACTIVO'
from dept where dept.nombre = 'Tecnologia'
on conflict do nothing;

with dept as (
  select id, nombre from departamentos
)
insert into empleados (nombre, email, id_departamento, estado)
select 'Maria Gomez', 'maria.gomez@empresa.com', dept.id, 'ACTIVO'
from dept where dept.nombre = 'Administracion'
on conflict do nothing;

