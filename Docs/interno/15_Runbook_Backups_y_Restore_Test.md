# Runbook de Backups y Pruebas de Restauración

- **Nombre de archivo sugerido:** `15_Runbook_Backups_y_Restore_Test.md`
- **Objetivo:** Estandarizar la política y el procedimiento para la creación de copias de seguridad (backups) y, de manera crítica, para la realización de pruebas de restauración periódicas, asegurando que los backups sean viables y confiables.
- **Audiencia:** Interno (Técnicos de Soporte, Equipo de Operaciones)

---

# Runbook: Backups y Pruebas de Restauración

Un backup que no ha sido probado no es un backup; es una esperanza. Este runbook establece el procedimiento estándar para la gestión de copias de seguridad de todos los clientes de IT Partner.

## 1. Política General de Backups

-   **Responsabilidad:** La configuración y el monitoreo de los backups son responsabilidad de Cambiodigital como parte del servicio IT Partner.
-   **Frecuencia:** Se debe configurar un backup **diario** para todos los componentes críticos del cliente.
-   **Retención:** Se debe mantener una política de retención de al menos **30 días** de backups diarios.
-   **Almacenamiento:** Los backups deben almacenarse en una ubicación geográficamente separada del servidor de producción (ej. Amazon S3, Backblaze B2, o un servidor de backups dedicado).

## 2. Componentes Críticos a Incluir en el Backup

Como mínimo, los siguientes componentes deben ser incluidos en el plan de backup de cada cliente durante la fase de estabilización.

-   [ ] **Base de Datos:**
    -   Backup completo de todas las bases de datos de producción (ej. MySQL, PostgreSQL).
    -   **Método:** `mysqldump` o `pg_dump`.
-   [ ] **Archivos del Sitio Web/Aplicación:**
    -   Copia completa del directorio raíz de la aplicación (ej. `/var/www/html`).
    -   **Método:** `rsync` o `tar`.
-   [ ] **Archivos de Configuración del Servidor:**
    -   Copia del directorio `/etc` o de los archivos de configuración específicos de los servicios (Nginx, Apache, etc.).

## 3. Procedimiento de Configuración de Backups (Durante la Estabilización)

1.  **Crear el Script de Backup:**
    -   Crear un script de shell (ej. `backup.sh`) que realice los siguientes pasos:
        1.  Poner el sitio en modo mantenimiento (si es posible).
        2.  Realizar el dump de la base de datos.
        3.  Comprimir los archivos de la aplicación y la base de datos en un único archivo `tar.gz` con la fecha en el nombre.
        4.  Quitar el modo mantenimiento.
        5.  Subir el archivo comprimido al almacenamiento externo (ej. usando `aws s3 cp`).
        6.  Limpiar los backups locales y los backups antiguos en el almacenamiento externo según la política de retención.
        7.  Registrar el resultado en un archivo de log.

2.  **Configurar el Cron Job:**
    -   Configurar un cron job en el servidor del cliente para que ejecute el script `backup.sh` diariamente en un horario de bajo tráfico (ej. 3:00 AM).
    -   **Ejemplo de Cron Job:** `0 3 * * * /path/to/backup.sh >> /var/log/backup.log 2>&1`

3.  **Configurar el Monitoreo:**
    -   Configurar una alerta en nuestro sistema de monitoreo que verifique si el job de backup se completó con éxito. Si el log no se actualiza o contiene errores, se debe generar una alerta S2 (ver `14_Runbook_Monitoreo_y_Alertas.md`).

## 4. Procedimiento de Prueba de Restauración (CRÍTICO)

Realizar pruebas de restauración es la única forma de garantizar que nuestros backups son funcionales. Esta no es una tarea opcional.

-   **Frecuencia:** Se debe realizar una prueba de restauración para cada cliente **una vez cada trimestre (cada 3 meses)**.

### **Pasos para la Prueba de Restauración:**

1.  **Aprovisionar un Entorno de Staging:**
    -   **NUNCA** realizar una prueba de restauración sobre el entorno de producción.
    -   Aprovisionar un servidor o contenedor temporal y aislado (un "entorno de staging").

2.  **Descargar el Último Backup:**
    -   Descargar el archivo de backup más reciente desde el almacenamiento externo al entorno de staging.

3.  **Ejecutar la Restauración:**
    -   Descomprimir el archivo de backup.
    -   Importar la base de datos desde el archivo de dump.
    -   Restaurar los archivos de la aplicación en el directorio correspondiente.
    -   Ajustar los archivos de configuración (ej. la conexión a la base de datos) para que funcionen en el entorno de staging.

4.  **Verificación Funcional:**
    -   **Checklist de Verificación:**
        -   [ ] ¿El sitio web carga sin errores?
        -   [ ] ¿Se puede iniciar sesión como administrador?
        -   [ ] ¿Los datos recientes (ej. últimos posts, usuarios o productos) están presentes?
        -   [ ] ¿Las funcionalidades clave (ej. formularios, carrito de compra) operan correctamente?

5.  **Documentación y Cierre:**
    -   Crear un ticket interno para registrar la prueba de restauración.
    -   Documentar el resultado en el ticket: "Prueba de restauración para [Cliente] completada con éxito el [Fecha]. El backup del [Fecha del Backup] es viable."
    -   Si la prueba falla, escalar inmediatamente a un ticket S2 para investigar y resolver el problema con el proceso de backup.
    -   Destruir el entorno de staging.

## 5. Runbook de Falla de Backup

Si el sistema de monitoreo genera una alerta de "Falla de Backup" (S2):

1.  **Investigar el Log:** Revisar el archivo de log del backup (`/var/log/backup.log`) para identificar el mensaje de error.
2.  **Causas Comunes y Soluciones:**
    -   **Error "Permiso denegado":** Verificar los permisos del script y de los directorios.
    -   **Error "Espacio en disco insuficiente":** Liberar espacio en el servidor o en el almacenamiento de backups.
    -   **Error de autenticación (ej. S3):** Verificar que las claves de API sean correctas y no hayan expirado.
    -   **Base de datos bloqueada:** Investigar si hay procesos que impiden el acceso a la base de datos.
3.  **Resolver y Re-ejecutar:** Una vez solucionado el problema, ejecutar el script de backup manualmente para confirmar que ahora funciona.
4.  **Documentar:** Registrar la causa del fallo y la solución en el ticket correspondiente.

---

### PENDIENTES DE DEFINICIÓN

-   **Herramientas Específicas:** Definir las herramientas estándar para el almacenamiento de backups (ej. Amazon S3, Backblaze B2) y los scripts o software de backup a utilizar (ej. scripts personalizados, JetBackup, etc.).
-   **Entorno de Staging:** Definir el proceso para aprovisionar entornos de staging de manera rápida y económica (ej. usando Docker, un VPS temporal, etc.).
