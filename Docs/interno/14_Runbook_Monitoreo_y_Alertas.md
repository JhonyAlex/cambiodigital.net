# Runbook de Monitoreo y Gestión de Alertas

- **Nombre de archivo sugerido:** `14_Runbook_Monitoreo_y_Alertas.md`
- **Objetivo:** Establecer un procedimiento operativo estándar (SOP) para la gestión del sistema de monitoreo 24/7, definiendo qué se monitorea, cómo se configuran las alertas y cómo debe reaccionar el equipo ante cada tipo de alerta.
- **Audiencia:** Interno (Técnicos de Soporte, Equipo de Operaciones)

---

# Runbook: Monitoreo y Gestión de Alertas

Este runbook define el protocolo para el monitoreo proactivo de la infraestructura de los clientes de IT Partner. El objetivo es detectar y reaccionar a los problemas antes de que el cliente los note.

## 1. Filosofía del Monitoreo

-   **Proactividad sobre Reactividad:** No esperamos a que el cliente nos diga que algo está mal. Nuestro sistema nos lo dice primero.
-   **Alertas Accionables:** Solo generamos alertas que requieren una acción. El ruido se filtra para evitar la fatiga de alertas.
-   **Monitoreo Continuo, Respuesta en Horario:** El sistema monitorea 24/7, pero la intervención humana se realiza durante el horario de soporte (L-V, 8am-6pm), salvo en casos excepcionales definidos por un plan de guardia.

## 2. Herramientas de Monitoreo

-   **Herramienta Principal:** [PENDIENTE: Nombre de la Herramienta, ej. Datadog, UptimeRobot, Zabbix]
-   **Canal de Alertas:** Todas las alertas se centralizan en [PENDIENTE: Nombre del Canal, ej. un canal de Slack #alerts, PagerDuty].

## 3. Métricas Clave a Monitorear por Cliente

Para cada cliente, se deben configurar los siguientes monitores como parte del checklist de activación.

### **Monitoreo de Disponibilidad (Uptime)**

-   **Qué se monitorea:**
    -   El sitio web principal (HTTP 200 OK).
    -   El servidor principal (Ping/ICMP).
    -   APIs o endpoints críticos.
-   **Frecuencia de Chequeo:** Cada 1 minuto.
-   **Condición de Alerta:** Si el chequeo falla durante **3 minutos consecutivos**.
-   **Tipo de Alerta:** **Crítica (S1)**.

### **Monitoreo de Rendimiento del Servidor**

-   **Qué se monitorea:**
    -   **Uso de CPU:**
        -   Condición de Alerta (Warning): > 80% durante 10 minutos.
        -   Condición de Alerta (Crítica): > 95% durante 5 minutos.
    -   **Uso de Memoria RAM:**
        -   Condición de Alerta (Warning): > 85% durante 10 minutos.
        -   Condición de Alerta (Crítica): > 95% durante 5 minutos.
    -   **Espacio en Disco:**
        -   Condición de Alerta (Warning): > 85% de capacidad.
        -   Condición de Alerta (Crítica): > 95% de capacidad.
-   **Tipo de Alerta:** **Warning (S3)** o **Crítica (S2)**.

### **Monitoreo de Base de Datos**

-   **Qué se monitorea:**
    -   Conectividad a la base de datos.
    -   Número de conexiones activas.
    -   Consultas lentas (slow queries).
-   **Condición de Alerta:**
    -   Fallo de conexión: **Crítica (S1)**.
    -   Exceso de conexiones o consultas lentas persistentes: **Warning (S3)**.

### **Monitoreo de Backups**

-   **Qué se monitorea:** El resultado del job de backup diario.
-   **Condición de Alerta:** Si el backup falla o no se completa.
-   **Tipo de Alerta:** **Alta (S2)**.

## 4. Protocolo de Respuesta a Alertas

Cuando una alerta aparece en el canal `#alerts`, el técnico de turno debe seguir este protocolo.

### **Paso 1: Acuse de Recibo de la Alerta (5 minutos)**

-   **Acción:** Reaccionar al mensaje de la alerta en Slack con un emoji (👀) para indicar que alguien la está viendo. Esto evita que dos personas trabajen en lo mismo.

### **Paso 2: Creación del Ticket (5 minutos)**

-   **Acción:** Crear un ticket proactivo en el sistema de ticketing a nombre del cliente afectado.
-   **Título del Ticket:** `[Alerta Proactiva] - [Descripción de la Alerta]` (ej. `[Alerta Proactiva] - Servidor Principal Caído`).
-   **Asignar Severidad:** Asignar la severidad correspondiente (S1, S2, S3) según la naturaleza de la alerta.

### **Paso 3: Investigación Inicial (15-30 minutos)**

-   **Acción:** Acceder al dashboard de la herramienta de monitoreo para investigar la alerta.
-   **Objetivo:** Validar si es una alerta real o un falso positivo y entender el impacto.

### **Paso 4: Ejecución del Runbook Específico**

-   **Acción:** Seguir el runbook correspondiente al tipo de alerta:
    -   **Alerta de Uptime (S1):**
        1.  Intentar acceder al sitio/servidor manualmente.
        2.  Revisar los logs del servidor web y de la aplicación.
        3.  Reiniciar el servicio afectado (ej. `sudo systemctl restart nginx`).
        4.  Si el problema persiste, escalar al técnico senior.
        5.  **Comunicar al cliente** (si el problema dura más de 15 minutos): "Hola [Nombre], nuestro sistema de monitoreo ha detectado que tu sitio está caído. Ya estamos trabajando en ello y te mantendremos informado."
    -   **Alerta de Rendimiento (S2/S3):**
        1.  Conectarse al servidor (`ssh`).
        2.  Ejecutar `top` o `htop` para identificar el proceso que consume recursos.
        3.  Analizar los logs para encontrar la causa.
        4.  Tomar acciones correctivas (ej. optimizar una consulta, reiniciar un proceso).
    -   **Alerta de Falla de Backup (S2):**
        1.  Revisar los logs del script de backup.
        2.  Identificar la causa del fallo (ej. falta de espacio, error de permisos).
        3.  Corregir el problema y ejecutar el backup manualmente.
        4.  Verificar que la nueva copia se haya completado con éxito.

### **Paso 5: Documentación y Cierre**

-   **Acción:** Documentar todas las acciones tomadas y la causa raíz del problema en el ticket.
-   **Cierre:** Una vez que el sistema vuelve a la normalidad, cerrar el ticket proactivo. Si se comunicó con el cliente, notificarle la resolución.

---

### PENDIENTES DE DEFINICIÓN

-   **Herramientas Específicas:** Es crucial definir las herramientas exactas que se usarán para el monitoreo y la gestión de alertas para que este runbook pueda ser más específico en los comandos y procedimientos.
-   **Política de Guardia Fuera de Horario:** Las fuentes indican que no hay intervención técnica fuera de horario. Esto representa un riesgo para incidentes S1 que ocurren de noche o en fines de semana. Se debe tomar una decisión sobre si se implementará un sistema de guardia pagado para al menos un técnico, que pueda manejar alertas S1 fuera del horario estándar. Si se implementa, este runbook deberá ser actualizado con el protocolo de escalamiento a la guardia.
