# Política de Estructura de Carpetas y Nomenclatura de Archivos

- **Nombre de archivo sugerido:** `16_Estructura_Carpetas_y_Naming.md`
- **Objetivo:** Estandarizar la organización de la información de los clientes, definiendo una estructura de carpetas y una convención de nomenclatura de archivos claras y predecibles. Esto es vital para la eficiencia, la colaboración y la rápida recuperación de información.
- **Audiencia:** Interno (Todo el equipo de Cambiodigital)

---

# Política: Estructura de Carpetas y Nomenclatura

La consistencia en cómo organizamos nuestros archivos es fundamental para la escalabilidad y la eficiencia del equipo. Toda la información de los clientes de IT Partner debe seguir la estructura y las convenciones de nomenclatura definidas en este documento.

## 1. Ubicación Central del Repositorio

Todo el trabajo de los clientes se almacenará en la siguiente ubicación centralizada:

**[PENDIENTE: Definir la ubicación, ej. Google Drive/Shared Drives/IT_Partner_Clientes/]**

## 2. Estructura de Carpetas por Cliente

Para cada cliente, se debe crear una carpeta principal con su nombre. El nombre de la carpeta debe ser el nombre oficial del cliente en minúsculas y con guiones en lugar de espacios.

**Ejemplo:** Para el cliente "Mi Empresa S.A.S.", la carpeta será `mi-empresa-sas`.

Dentro de la carpeta de cada cliente, se debe crear la siguiente estructura de subcarpetas:

```
[nombre-del-cliente]/
│
├── 01_contratos_y_legal/
│   └── terminos_y_condiciones_firmados.pdf
│
├── 02_documentacion_tecnica/
│   ├── inventario_ti.md
│   ├── accesos_y_credenciales.md  (Referencia al gestor de contraseñas)
│   └── arquitectura_de_red.png
│
├── 03_tickets_y_soporte/
│   ├── S1_caida_servidor_2026-01-12/
│   │   └── logs_servidor.txt
│   └── S3_consulta_configuracion_2026-01-15/
│
├── 04_reportes_y_comunicacion/
│   ├── reporte_estabilizacion.pdf
│   └── reporte_mensual_2026_02.pdf
│
├── 05_backups/
│   └── logs_pruebas_restauracion.md
│
└── 06_proyectos/
    └── migracion_servidor_2026_03/
        ├── cotizacion_migracion.pdf
        └── plan_de_proyecto.md
```

### **Descripción de las Carpetas:**

-   **`01_contratos_y_legal`**: Almacena todos los documentos legales, incluyendo los términos y condiciones firmados, acuerdos de confidencialidad, etc.
-   **`02_documentacion_tecnica`**: El cerebro del cliente. Contiene toda la documentación viva de su infraestructura, como el inventario de activos, diagramas de red y el documento que referencia las credenciales en nuestro gestor de contraseñas.
-   **`03_tickets_y_soporte`**: Para documentación de soporte específica que no cabe en el sistema de ticketing. Se crea una subcarpeta por cada ticket complejo que requiera almacenar archivos (logs, capturas, etc.).
-   **`04_reportes_y_comunicacion`**: Guarda todos los reportes generados para el cliente, como el reporte de estabilización y los futuros reportes mensuales de rendimiento.
-   **`05_backups`**: Contiene los logs y la documentación relacionada con las pruebas de restauración de backups, no los backups en sí.
-   **`06_proyectos`**: Para cada trabajo que se cotiza como un proyecto aparte. Se crea una subcarpeta por proyecto, conteniendo la cotización, el plan de trabajo y otros documentos relevantes.

## 3. Convención de Nomenclatura de Archivos

Para mantener el orden dentro de las carpetas, todos los archivos deben seguir una convención de nomenclatura lógica y consistente.

-   **Formato General:** `[TipoDeDocumento]_[DescripcionBreve]_[Fecha_AAAA-MM-DD].[extension]`
-   **Reglas:**
    -   Todo en **minúsculas**.
    -   Usar **guiones bajos (`_`)** para separar palabras.
    -   Usar el formato de fecha **ISO 8601 (`AAAA-MM-DD`)** para facilitar el orden cronológico.

### **Ejemplos de Nombres de Archivos:**

-   `reporte_mensual_2026_02_28.pdf`
-   `acta_reunion_kickoff_2026_01_15.md`
-   `cotizacion_proyecto_migracion_2026_03_01.pdf`
-   `log_error_servidor_2026_02_10.txt`

### **Nomenclatura para Documentos Vivos:**

Los documentos que se actualizan constantemente (como el inventario de TI) no llevan fecha en el nombre para indicar que son la única fuente de verdad.

-   `inventario_ti.md`
-   `procedimientos_operativos.md`

## 4. Gestión de Credenciales

**CRÍTICO:** Las contraseñas, claves de API o cualquier otra información sensible **NUNCA** deben guardarse en texto plano en estos documentos.

-   **Herramienta:** Todas las credenciales deben almacenarse en nuestro gestor de contraseñas centralizado **[PENDIENTE: Nombre del Gestor, ej. 1Password, Bitwarden]**.
-   **Documentación:** El archivo `accesos_y_credenciales.md` en la carpeta `02_documentacion_tecnica` no contendrá las contraseñas, sino que actuará como un índice, describiendo qué credenciales existen y dónde encontrarlas en el gestor de contraseñas (ej. "Credencial para el panel de control de AWS, buscar en Bitwarden bajo el nombre 'AWS Console - [Cliente]').

---

### PENDIENTES DE DEFINICIÓN

-   **Ubicación del Repositorio Central:** Es fundamental definir y configurar la ubicación compartida donde residirán todas las carpetas de los clientes.
-   **Gestor de Contraseñas:** Se debe seleccionar e implementar una herramienta estándar para la gestión de credenciales en toda la empresa.
