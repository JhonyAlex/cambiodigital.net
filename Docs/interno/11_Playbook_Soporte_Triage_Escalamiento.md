# Playbook de Soporte: Triage, Escalamiento y Resolución

- **Nombre de archivo sugerido:** `11_Playbook_Soporte_Triage_Escalamiento.md`
- **Objetivo:** Estandarizar el proceso de gestión de tickets de soporte, desde la recepción inicial hasta la resolución o escalamiento, para garantizar respuestas consistentes, eficientes y alineadas con el SLA.
- **Audiencia:** Interno (Equipo de Soporte Técnico, Técnicos de Nivel 1 y 2)

---

# Playbook de Gestión de Tickets de Soporte

Este documento es la guía operativa para todo el personal de soporte de IT Partner. Seguir este playbook es **obligatorio** para asegurar la calidad y consistencia de nuestro servicio.

## El Ciclo de Vida de un Ticket

Todo ticket sigue un ciclo de vida de 6 etapas:

1.  **Recepción:** El ticket llega a través de un canal oficial.
2.  **Triage:** El ticket es evaluado, categorizado y priorizado.
3.  **Asignación:** El ticket se asigna al técnico más adecuado.
4.  **Resolución:** El técnico trabaja en la solución y se comunica con el cliente.
5.  **Cierre:** El ticket se resuelve y se confirma con el cliente.
6.  **Escalamiento:** Si no puede ser resuelto, se escala (técnica o comercialmente).

## 1. Proceso de Triage (Los Primeros 15 Minutos)

Cuando un nuevo ticket llega a la cola de `soporte@cambiodigital.net`, el técnico de turno debe realizar el triage inmediatamente.

### Paso 1: Acuse de Recibo (Automático/Manual)

-   **Acción:** Asegurarse de que el cliente reciba una confirmación de que su solicitud ha sido recibida. Idealmente, esto debe ser automático. Si el sistema falla, enviar una confirmación manual.
-   **Objetivo Interno:** Confirmar la recepción en menos de 30 minutos.

### Paso 2: Evaluar la Solicitud

-   **Acción:** Leer detenidamente la solicitud del cliente para entender el problema.
-   **Checklist de Evaluación:**
    -   ¿El cliente proporciona suficiente información? (URL, capturas, descripción).
    -   ¿El problema parece afectar a uno o a muchos usuarios?
    -   ¿Impacta una función crítica del negocio (ej. ventas, operaciones)?

### Paso 3: Asignar Severidad

-   **Acción:** Asignar una etiqueta de severidad al ticket según la siguiente matriz. Esta decisión determina la prioridad.

| Severidad | Criterio | Prioridad | Asignación Inmediata |
| :--- | :--- | :--- | :--- |
| **S1 - Crítico** | Sistema principal caído, brecha de seguridad, pérdida de datos. Impacto total en el negocio. | **Máxima** | Sí, interrumpir otras tareas. |
| **S2 - Alto** | Función importante degradada, sin solución temporal fácil. Impacto significativo. | **Alta** | Sí, atender antes que S3/S4. |
| **S3 - Medio** | Problema con impacto limitado o con solución temporal. Inconveniencia. | **Normal** | En cola, según orden de llegada. |
| **S4 - Bajo** | Pregunta, solicitud de información, tarea planificable. Sin impacto operativo. | **Baja** | Programar para momentos de baja carga. |

### Paso 4: Clasificar Tipo de Ticket

-   **Acción:** Asignar una categoría al ticket para facilitar el seguimiento y la asignación.
-   **Categorías:** `Incidente`, `Consulta`, `Solicitud de Cambio`, `Mantenimiento`.

## 2. Proceso de Asignación

-   **Tickets S1/S2:** Deben ser asignados **inmediatamente** al técnico de turno o al especialista con más experiencia en el área afectada.
-   **Tickets S3/S4:** Se asignan al técnico con mayor disponibilidad o según la carga de trabajo del equipo.

## 3. Proceso de Resolución

### Paso 1: Primera Respuesta (Dentro del SLA)

-   **Acción:** El técnico asignado debe enviar la **primera respuesta humana** al cliente dentro del SLA del plan.
    -   **Plan Estándar:** < 2 horas.
    -   **Plan Evolución:** [PENDIENTE: Definir SLA VIP, ej. < 60 minutos].
-   **Contenido de la Respuesta:**
    -   "Hola [Nombre], soy [Tu Nombre]. He recibido tu solicitud sobre [Problema] y ya estoy investigando. Te mantendré informado."
    -   Si se necesita más información, este es el momento de pedirla.

### Paso 2: Investigación y Diagnóstico

-   **Acción:** Investigar la causa raíz del problema. Documentar los hallazgos en el ticket.

### Paso 3: Comunicación con el Cliente

-   **Regla de Oro:** El cliente nunca debe preguntar "¿Qué ha pasado con mi ticket?".
-   **Protocolo de Comunicación:**
    -   **Tickets S1/S2:** Actualizar al cliente cada 60-90 minutos, incluso si es para decir "sigo trabajando en ello".
    -   **Tickets S3/S4:** Actualizar al cliente al menos una vez al día.
    -   Siempre comunicar una solución temporal si se encuentra una.

### Paso 4: Cierre del Ticket

-   **Acción:** Una vez que la solución ha sido implementada, confirmar con el cliente que el problema está resuelto desde su perspectiva.
-   **Email de Cierre:** "Hola [Nombre], hemos implementado la solución para [Problema]. ¿Puedes confirmar que todo funciona correctamente ahora? Si no recibimos respuesta en 24 horas, cerraremos este ticket, pero puedes reabrirlo si el problema persiste."

## 4. Proceso de Escalamiento

Un ticket debe ser escalado si se cumple alguna de las siguientes condiciones.

### A. Escalamiento Técnico

-   **Cuándo escalar:**
    -   No logras identificar la causa de un problema S1/S2 después de 60 minutos de investigación.
    -   La solución requiere conocimientos que no posees (ej. un área de infraestructura muy específica).
    -   Te das cuenta de que la solución podría tener un impacto negativo en otras partes del sistema.
-   **A quién escalar:** A [Nombre del Técnico Senior o Especialista].
-   **Cómo escalar:** Reasigna el ticket en el sistema de ticketing, @mencionando al técnico senior con un resumen de lo que has intentado hasta ahora.

### B. Escalamiento de Alcance (Soporte vs. Proyecto)

-   **Cuándo escalar:**
    -   La solicitud del cliente implica claramente la creación de algo nuevo (ver documento `05_Soporte_vs_Proyecto.md`).
    -   Estimas que la tarea tomará más de 8 horas de trabajo.
    -   El cliente solicita una "mejora" que parece exceder el alcance de la mejora mensual del Plan Evolución.
-   **A quién escalar:** A [Nombre del Gerente de Cuentas o Líder de Soporte].
-   **Cómo escalar:**
    1.  **No comiences el trabajo.**
    2.  Comunica al cliente de manera profesional: "Hola [Nombre], gracias por tu solicitud. He estado revisándola y parece que podría estar fuera del alcance del soporte estándar y calificar como un proyecto. Lo estoy escalando a nuestro gerente de cuentas, [Nombre], quien se pondrá en contacto contigo para discutir los próximos pasos. No te preocupes, no haremos ningún trabajo facturable sin tu aprobación previa."
    3.  Asigna el ticket al gerente con una nota interna explicando tu evaluación.

---

### PENDIENTES DE DEFINICIÓN

-   **SLA del Plan Evolución:** El playbook necesita el tiempo exacto para la primera respuesta del Plan Evolución.
-   **Contactos de Escalamiento:** Los placeholders `[Nombre del Técnico Senior o Especialista]` y `[Nombre del Gerente de Cuentas o Líder de Soporte]` deben ser reemplazados por los nombres y roles reales.
-   **Herramienta de Ticketing:** El proceso exacto de reasignación y @mención dependerá de la herramienta de ticketing que se elija (Jira, Zendesk, etc.).
