# Checklist de Activación de Nuevo Cliente

- **Nombre de archivo sugerido:** `12_Checklist_Activacion_Cliente.md`
- **Objetivo:** Proporcionar al equipo interno (soporte y onboarding) un checklist estandarizado y accionable para seguir durante la activación y la fase de estabilización de cada nuevo cliente, asegurando que no se omita ningún paso crítico.
- **Audiencia:** Interno (Equipo de Onboarding, Técnicos de Soporte, Gerentes de Cuenta)

---

# Checklist de Activación de Cliente: IT Partner

**Cliente:** [Nombre del Cliente]
**Plan:** [Estándar / Evolución]
**Fecha de Inicio:** [Fecha]
**Técnico Asignado:** [Nombre del Técnico]

Este checklist debe ser completado para **cada nuevo cliente** que se incorpore al servicio IT Partner. El objetivo es garantizar un proceso de onboarding consistente, profesional y completo.

## Fase 0: Pre-Activación (Inmediatamente después del pago)

-   [ ] **Verificación de Pago:** Confirmar en Stripe que el pago inicial se ha procesado correctamente.
-   [ ] **Creación en Sistemas Internos:**
    -   [ ] Crear la cuenta del cliente en el sistema de ticketing (ej. Zendesk, Jira).
    -   [ ] Crear la carpeta del cliente en la estructura de archivos (ver `16_Estructura_Carpetas_y_Naming.md`).
-   [ ] **Asignación de Técnico:** Asignar un técnico principal al cliente.
-   [ ] **Envío de Email de Bienvenida:**
    -   [ ] Utilizar la plantilla `01_Email_Bienvenida` del documento de comunicaciones.
    -   [ ] Adjuntar el `Formulario_Inventario.html`.
    -   [ ] Personalizar con el nombre del cliente y el técnico asignado.

## Fase 1: Descubrimiento (Semana 1)

-   [ ] **Recepción del Formulario de Inventario:** Confirmar que el cliente ha enviado el formulario completo.
-   [ ] **Agendamiento de Reunión de Kickoff:**
    -   [ ] Proponer 3 horarios al cliente para una llamada de 60 minutos.
    -   [ ] Enviar la invitación de calendario con el enlace de la videoconferencia.
-   [ ] **Preparación para el Kickoff:** El técnico asignado debe revisar el Formulario de Inventario y preparar preguntas específicas.
-   [ ] **Ejecución de la Reunión de Kickoff:**
    -   [ ] Seguir la agenda estándar (presentación, revisión de inventario, objetivos, próximos pasos).
    -   [ ] Tomar notas detalladas de la reunión.
-   [ ] **Documentación Inicial:**
    -   [ ] Crear el `Documento_Inventario_TI.md` en la carpeta del cliente.
    -   [ ] Registrar todos los activos, accesos y proveedores identificados.
-   [ ] **Envío de Resumen Post-Kickoff:** Enviar un email al cliente resumiendo lo discutido y los próximos pasos acordados.

## Fase 2: Estabilización (Semanas 2-12)

### **Infraestructura y Seguridad**

-   [ ] **Gestión de Accesos:**
    -   [ ] Recolectar todas las credenciales necesarias.
    -   [ ] Guardar las credenciales de forma segura en nuestro gestor de contraseñas.
-   [ ] **Configuración de Backups:**
    -   [ ] Implementar un sistema de backups automáticos para los sistemas críticos del cliente.
    -   [ ] Realizar una primera copia de seguridad completa.
    -   [ ] **Ejecutar una prueba de restauración** para verificar la integridad de la copia.
-   [ ] **Implementación de Monitoreo:**
    -   [ ] Conectar los servidores y sitios web del cliente a nuestra herramienta de monitoreo (ej. Datadog).
    -   [ ] Configurar alertas para eventos críticos (caídas, uso de CPU, espacio en disco).
-   [ ] **Auditoría y Optimización:**
    -   [ ] Realizar una auditoría de seguridad básica (actualizaciones, parches, permisos).
    -   [ ] Analizar el rendimiento y aplicar optimizaciones iniciales (caché, compresión, etc.).

### **Comunicación y Capacitación**

-   [ ] **Agendamiento de Capacitaciones:**
    -   [ ] Contactar al cliente para agendar la primera sesión de capacitación mensual.
    -   [ ] Acordar el tema según las necesidades del cliente.
-   [ ] **Reporte de Avance Semanal:** Enviar un breve email al cliente cada viernes con un resumen de las actividades de estabilización realizadas durante la semana.

## Fase 3: Cierre de la Estabilización (Final del Mes 3)

-   [ ] **Revisión Interna del Checklist:** Asegurarse de que todos los puntos anteriores estén completados.
-   [ ] **Creación del Reporte de Estabilización:**
    -   [ ] Preparar un documento que resuma todo el trabajo realizado en los 90 días.
    -   [ ] Incluir: estado del inventario, configuración de backups, dashboard de monitoreo, optimizaciones realizadas y temas de capacitación cubiertos.
-   [ ] **Reunión de Cierre de Estabilización (30 min):**
    -   [ ] Agendar una llamada con el cliente para presentar el reporte.
    -   [ ] Explicar el estado actual de su infraestructura.
    -   [ ] Clarificar cómo funcionará el soporte a partir de ahora (modelo mensual).
-   [ ] **Envío de Email de Fin de Estabilización:**
    -   [ ] Utilizar la plantilla correspondiente del documento de comunicaciones.
    -   [ ] Adjuntar el Reporte de Estabilización.
-   [ ] **Transición a Operación Normal:**
    -   [ ] Confirmar en el sistema de facturación que la suscripción pasará al cobro mensual recurrente.
    -   [ ] Archivar este checklist como completado en la carpeta del cliente.

---

**Checklist Completado por:** [Tu Nombre]
**Fecha de Finalización:** [Fecha]

**Verificación del Gerente:** [Nombre del Gerente]
**Fecha de Verificación:** [Fecha]
