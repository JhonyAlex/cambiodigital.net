# Documentación Técnica: Sistema de Formularios y n8n

Este documento detalla la implementación técnica de los formularios de contacto y solicitud de servicios en el sitio web de Cambio Digital, así como su integración con el orquestador de automatización **n8n**.

---

## 1. Arquitectura General

El sistema de contacto está diseñado bajo una arquitectura desacoplada donde el frontend (HTML/JS) captura la información y la envía a un **Webhook de n8n** para su procesamiento. No existe un backend tradicional (PHP/Node.js) procesando los formularios directamente en el servidor web.

### Componentes Clave

1.  **Frontend (Cliente):**
    *   Formularios HTML (incrustados o cargados dinámicamente).
    *   Lógica JavaScript (Validación, construcción del payload, envío asíncrono).
2.  **Middleware (Transporte):**
    *   API Fetch estándar del navegador.
    *   Formato de datos: `FormData` (soporte multipart para archivos).
3.  **Backend (Automatización):**
    *   **Plataforma:** n8n (Self-hosted en `n8n.cambiodigital.cloud`).
    *   **Endpoint:** Webhook único que recibe todos los tipos de envío.

---

## 2. Tipos de Formularios Implementados

Existen tres variantes principales de formularios en el sitio, cada uno con un propósito y estructura de datos específica.

### A. Formulario de Contacto Simple ("Hablemos")
*   **Ubicación:** `partials/contact.html` (Cargado en Home).
*   **Propósito:** Lead generation rápido, consultas generales.
*   **Identificador:** `formType: 'simple'`
*   **Campos:**
    *   Nombre (`requester`)
    *   Empresa (`company`)
    *   Método de Contacto (`contactMethod`: 'email' | 'phone')
    *   Valor de Contacto (`contactValue`)
    *   Mensaje (`message`)

### B. Solicitud de Servicio ("Mesa de Ayuda")
*   **Ubicación:** `partials/contact.html` (Cargado en Home).
*   **Propósito:** Clientes actuales o nuevos solicitando soporte técnico específico.
*   **Identificador:** `formType: 'service'`
*   **Campos:**
    *   Solicitante (`requester`)
    *   Título del Requerimiento (`taskName`)
    *   Descripción Detallada (`taskDescription` - Formateada en Markdown)
    *   Fecha Límite (`dueDate` - Timestamp)
    *   Archivo Adjunto (`file` - Opcional, máx 50MB)

### C. Onboarding Inicial ("Bienvenida")
*   **Ubicación:** `servicios/bienvenida.html` (Incrustado).
*   **Propósito:** Primer ticket de servicio para nuevos clientes en proceso de onboarding.
*   **Identificador:** `formType: 'service-initial'`
*   **Campos:**
    *   Similar al Formulario de Servicio (B), pero fuerza el contacto por Email.

---

## 3. Especificación de la Integración (API Reference)

Todos los formularios envían datos al mismo endpoint. La diferenciación se realiza mediante el campo `formType`.

### Endpoint
*   **URL:** `https://n8n.cambiodigital.cloud/webhook/c1692d85-8ad6-4977-b484-541c16463d0a`
*   **Método:** `POST`
*   **Content-Type:** `multipart/form-data` (Gestionado automáticamente por `fetch`).

### Payload (Estructura de Datos)

| Campo | Tipo | Descripción | Obligatorio |
| :--- | :--- | :--- | :--- |
| `formType` | `string` | Identificador del tipo de formulario (`simple`, `service`, `service-initial`, `quote_calculator`). | Sí |
| `requester` | `string` | Nombre de la persona o contacto principal. | Sí |
| `company` | `string` | Nombre de la empresa (Solo en `simple` y `quote`). | No |
| `contactMethod` | `string` | Canal preferido: `'email'` o `'phone'`. | Sí |
| `contactValue` | `string` | Dirección de correo o número de teléfono completo. | Sí |
| `message` | `string` | Cuerpo del mensaje (Solo en `simple`). | No |
| `taskName` | `string` | Título breve de la tarea/solicitud (Solo en `service`). | No |
| `taskDescription`| `string` | Descripción detallada, suele incluir metadatos formateados. | No |
| `dueDate` | `number` | Timestamp (ms) de la fecha límite deseada. | No |
| `file` | `File` | Archivo adjunto binario. | No |

---

## 4. Lógica de Frontend (JavaScript)

La lógica de manipulación del DOM y envío de datos se encuentra principalmente en `index.html` (para los formularios de Home) y `servicios/bienvenida.html` (para el onboarding).

### Flujo de Envío (`index.html`)

1.  **Captura del Evento:** `serviceForm.addEventListener('submit', ...)`
2.  **Bloqueo de UI:**
    *   Cambia el texto del botón a "Enviando...".
    *   Deshabilita el botón para evitar doble envío.
3.  **Validación de Archivo:**
    ```javascript
    if (file && file.size > 50 * 1024 * 1024) { // 50MB
        alert('El archivo es demasiado grande...');
        return;
    }
    ```
4.  **Construcción del Payload:**
    *   Se instancia un objeto `FormData`.
    *   Se agregan los campos según el formulario activo.
    *   Se formatea la `taskDescription` combinando varios inputs (Solicitante, Contacto, Detalles).
5.  **Envío (Fetch):**
    ```javascript
    await fetch(N8N_WEBHOOK_URL, { method: 'POST', body: formData });
    ```
6.  **Manejo de Respuesta:**
    *   **Éxito (200 OK):** Limpia el formulario (`reset()`) y muestra el popup de éxito (`showSuccessPopup`).
    *   **Error:** Muestra alerta al usuario y registra el error en consola.
7.  **Restauración de UI:** Rehabilita el botón y restaura el texto original.

### Dependencias
*   **Lucide Icons:** Se llama a `lucide.createIcons()` tras el envío para renderizar nuevamente los iconos del botón (loader, check).

---

## 5. Notas de Mantenimiento y Seguridad

1.  **URL del Webhook:** Actualmente está **hardcoded** en `index.html` (línea 787) y `servicios/bienvenida.html` (línea 331).
    *   *Recomendación:* Centralizar esta URL en un archivo de configuración global (ej. `assets/js/config.js`) para facilitar cambios futuros.
2.  **Validación:** La validación actual es principalmente HTML5 (`required`, `type="email"`). No hay validación profunda de formatos (ej. regex de teléfonos) en el cliente.
3.  **Seguridad:** El endpoint de n8n es público. Se recomienda implementar:
    *   Rate limiting en n8n o a nivel de servidor web.
    *   Validación de origen (CORS) si es posible configurarlo en el webhook.
    *   Captcha (ej. Turnstile o reCAPTCHA) para evitar spam automatizado.
4.  **Archivos:** El límite de 50MB es alto para un formulario web estándar. Asegurarse de que el servidor de n8n tenga configurado `N8N_PAYLOAD_SIZE_MAX` acorde a este límite.
