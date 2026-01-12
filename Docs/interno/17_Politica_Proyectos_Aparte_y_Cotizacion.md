# Política de Proyectos Aparte y Proceso de Cotización

- **Nombre de archivo sugerido:** `17_Politica_Proyectos_Aparte_y_Cotizacion.md`
- **Objetivo:** Establecer una política interna clara y un proceso paso a paso para identificar, escalar, cotizar y gestionar el trabajo que queda fuera del alcance del soporte estándar de IT Partner.
- **Audiencia:** Interno (Equipo de Soporte, Gerentes de Cuenta, Equipo de Ventas)

---

# Política: Gestión de Proyectos de Alcance Adicional

## 1. Propósito

Esta política define el proceso para manejar las solicitudes de los clientes de IT Partner que no están cubiertas por su suscripción de soporte. El objetivo es proteger la rentabilidad del servicio, gestionar las expectativas del cliente y crear nuevas oportunidades de ingresos de manera estructurada y profesional.

Nuestra promesa al cliente es "nunca habrá cobros sorpresa". Este proceso garantiza que cumplamos esa promesa.

## 2. Identificación de un Proyecto (El Rol del Técnico de Soporte)

El técnico de soporte es la primera línea de defensa del alcance.

### **Cuándo Escalar una Solicitud:**

Un técnico **debe** detener el trabajo en un ticket y escalarlo al [Gerente de Cuenta] si la solicitud cumple **uno o más** de los siguientes criterios:

-   **Criterio de Verbo:** La solicitud principal es **crear, construir, desarrollar, diseñar o migrar**, en lugar de arreglar, mantener o ajustar.
-   **Criterio de Novedad:** El resultado final es una **funcionalidad, sistema o capacidad que no existe actualmente**.
-   **Criterio de Tiempo Estimado:** El técnico estima que la tarea requerirá **más de 8 horas de trabajo**.
-   **Criterio de Complejidad:** La tarea implica cambios en la **arquitectura fundamental**, la plataforma base o la integración de múltiples sistemas complejos.

Referencia cruzada: `05_Soporte_vs_Proyecto.md`.

### **Cómo Escalar (El Guion del Técnico):**

1.  **Pausa el Trabajo:** No avances más en la ejecución.
2.  **Comunica al Cliente (con profesionalismo):**
    > "Hola [Nombre del Cliente], gracias por tu solicitud sobre [descripción de la solicitud]. He estado revisándola y, por su naturaleza de [crear/construir/migrar] una nueva capacidad, parece que podría exceder el alcance del soporte estándar y calificar como un proyecto aparte. 
    >
    > Para asegurarnos de que le damos la atención que merece, he escalado tu solicitud a [Nombre del Gerente de Cuenta]. Él/ella se pondrá en contacto contigo en breve para entender mejor tus objetivos y discutir los posibles próximos pasos. No te preocupes, no se realizará ningún trabajo facturable sin tu total aprobación."
3.  **Escala Internamente:** Reasigna el ticket al [Gerente de Cuenta] con una nota interna: `Escalado para evaluación de proyecto. Mi estimación inicial es de [X horas]. Razón: [Criterio que cumple, ej. Criterio de Novedad].`

## 3. Proceso de Calificación y Cotización (El Rol del Gerente de Cuenta)

Una vez que un ticket es escalado, el Gerente de Cuenta es el dueño del proceso.

### **Paso 1: Contactar al Cliente (24 horas hábiles)**

-   **Acción:** Agendar una breve llamada con el cliente para entender el "porqué" detrás de la solicitud. ¿Cuál es el objetivo de negocio que buscan lograr?

### **Paso 2: Evaluación de Alcance y Estimación**

-   **Acción:** Trabajar con el equipo técnico para definir un alcance claro para el proyecto y estimar las horas necesarias.
-   **Entregable Interno:** Un documento de alcance simple que detalle:
    -   Objetivos del proyecto.
    -   Tareas incluidas.
    -   Tareas explícitamente excluidas.
    -   Estimación de horas (con un margen de contingencia del 15%).

### **Paso 3: Creación de la Cotización**

-   **Acción:** Crear una cotización formal utilizando la plantilla estándar.
-   **Tarifa de Proyecto:** La tarifa estándar para trabajo de proyecto es de **[PENDIENTE: Definir Tarifa por Hora, ej. $75 USD/hora]**.
-   **Contenido de la Cotización:**
    -   Alcance del proyecto.
    -   Costo total (Horas estimadas x Tarifa por hora).
    -   Cronograma de pagos (ej. 50% por adelantado, 50% al finalizar).
    -   Cronograma de ejecución estimado.
    -   Términos y condiciones específicos del proyecto.

### **Paso 4: Presentar la Cotización al Cliente**

-   **Acción:** Enviar la cotización al cliente por email, idealmente acompañada de una breve llamada para explicarla y resolver dudas.

## 4. Gestión del Proyecto

-   **Si el Cliente Aprueba:**
    1.  Se crea un nuevo canal de comunicación o proyecto en nuestro sistema de gestión.
    2.  Se asignan los recursos técnicos.
    3.  El trabajo comienza solo después de recibir el pago inicial acordado.
    4.  El proyecto se gestiona de forma separada al soporte de IT Partner, con sus propios informes de avance.
-   **Si el Cliente Rechaza:**
    1.  Se documenta la decisión en el ticket original.
    2.  Se cierra el ticket amablemente: "Entendido, [Nombre del Cliente]. Si en el futuro decides avanzar con esta iniciativa, no dudes en contactarnos. Mientras tanto, seguimos a tu disposición para el soporte de tu plan IT Partner."

---

### PENDIENTES DE DEFINICIÓN

-   **Roles Específicos:** Se debe asignar a una persona real al rol de `[Gerente de Cuenta]` o la figura responsable de la relación comercial y las cotizaciones.
-   **Tarifa por Hora para Proyectos:** Es crítico definir una tarifa por hora estándar para los trabajos de proyecto. Esta tarifa debe ser más alta que el costo implícito por hora del servicio de soporte para reflejar la naturaleza del trabajo y ser rentable.
-   **Plantilla de Cotización:** Se debe crear un documento `Plantilla_Cotizacion_Proyecto.md` para estandarizar todas las propuestas comerciales.
