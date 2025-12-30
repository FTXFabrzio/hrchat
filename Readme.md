HR Chat — Entrega de Reto Técnico (Alamo Company)

1) Resumen
Chat en lenguaje natural para consultar empleados y departamentos con información real y trazable.
Respuestas basadas en datos relacionales (empleado ↔ departamento) usando Supabase.
Portal web con CRUD completo para mantener datos actualizados (extra).
Ejemplo:

Pregunta: “¿Dónde trabaja Juan?”
Respuesta: “Juan trabaja en Dirección General, Sede Principal”.

2) Arquitectura (alto nivel)

Usuario/Portal
   -> n8n Webhook
      -> AI Agent (LangChain)
         -> Tools Supabase (Empleados / Departamentos)
            -> Respuesta

Join explicado:
Cada empleado tiene id_departamento, que referencia a departamentos.id.

El chatbot cruza ambos para responder con nombre de departamento y ubicación.

3) Datos (Modelo)

Entidades:
- departamentos: id, nombre, ubicacion, presupuesto (opcional), created_at, updated_at
- empleados: id, nombre, email, id_departamento, estado, fecha_inicio, fecha_fin, created_at, updated_at

Reto original (Excel):

empleados.xlsx: ID, Nombre, Email, ID_Depto
departamentos.xlsx: ID, Nombre, Ubicación

Evolución a Supabase:
Se migró la data a Postgres para mantener relaciones, habilitar CRUD y mejorar el demo, sin cambiar el objetivo del reto (responder preguntas sobre empleados y departamentos).

¿Por qué Supabase?

Relacional (FK real entre empleados y departamentos)
CRUD rápido y consistente
Permite escalar la demo con datos reales

4) Flujo n8n (Workflow)
Nodos EXACTOS:

Webhook-Mensaje
 Método: POST
 Path: 051f43ab-99a2-409b-b885-e4d3050be51c
 responseMode: responseNode

Campos (Set node)
mensaje = body.message
key = headers.host

AI Agent (LangChain Agent)
System Prompt + User Prompt (obliga formato A/B y “Cómo lo obtuve”)
 Modelo: gpt-4o-mini
Memoria: Simple Memory (Buffer Window)
sessionKey = headers.host

Tools:
Empleados: supabaseTool getAll table empleados
Departamentos: supabaseTool getAll table departamentos

Respond to Webhook
Responde texto = {{ $json.output }}
Notas importantes

Test URL y Production URL son diferentes en n8n.
El workflow debe estar ACTIVE para Production.
Solo debe existir un Respond to Webhook.

5) Prompts de IA (resumen)

Reglas principales:

Responde solo sobre empleados y departamentos.
No inventa datos.
Si hay varios empleados con el mismo nombre, solicita desambiguación.
Saludos no consultan BD.

Responde en formato:
A.Respuesta
B. Cómo lo obtuve
“Plus” logrado: explica cómo obtuvo la respuesta.

6) Instalación y Ejecución Local (Visual Studio Code)
Requisitos

Visual Studio Code (u otra IDE)
Node.js (v18 o superior)

Importante:
El frontend y el backend del portal se ejecutan de forma local desde la IDE.
El chat (n8n) ya se encuentra desplegado y operativo.
No es necesario desplegar n8n para probar el sistema.

Paso 1: Abrir el proyecto en la IDE

Abrir la carpeta raíz del proyecto en Visual Studio Code (o IDE equivalente).

Paso 2: Crear dos terminales
Terminal 1 — Frontend
cd frontend
npm install
npm run start

Esto levanta el frontend del portal web, desde donde se puede interactuar con el chat y gestionar los datos.

Terminal 2 — Backend
cd backend
npm install
npm run start

Esto levanta el backend local del portal, encargado de la lógica de la aplicación web.

Para ingresar al portal usa las siguientes credenciales:
email: gerencia@alamo.com
contraseña: alamo123

Paso 3: Funcionamiento del Chat (n8n)
El chat no se ejecuta localmente.
El chat está conectado a un agente de n8n ya desplegado.

Al interactuar con el chat desde el frontend, las preguntas se envían al webhook de n8n, el cual:

Consulta Supabase (Empleados y Departamentos).
Devuelve la respuesta en lenguaje natural.
Explica cómo obtuvo la respuesta.
Revisión del Agente n8n

Para analizar la lógica del chatbot y la automatización, se incluye el archivo:

/agente.json

Este archivo corresponde exactamente al workflow utilizado en producción para el chat.

Ejemplos de Prueba

¿En qué departamento trabaja Ana?
Lista todos los empleados de Ventas.
¿Cuántos empleados hay en la Sede Principal?
Dame el presupuesto del departamento donde trabaja Álvaro.


7) Alcance y Notas Finales

El portal web es un extra para facilitar la gestión de datos.
El core del reto está resuelto mediante el workflow de n8n.
No se requiere una UI compleja para validar la solución.



