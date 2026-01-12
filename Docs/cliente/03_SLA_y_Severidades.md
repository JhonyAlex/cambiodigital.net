# Acuerdo de Nivel de Servicio (SLA) y Severidades

- **Nombre de archivo sugerido:** `03_SLA_y_Severidades.md`
- **Objetivo:** Comunicar al cliente los tiempos de respuesta garantizados (SLA) para cada plan y definir un sistema de clasificación de severidad para los incidentes, estableciendo expectativas claras sobre cómo se priorizará su solicitud.
- **Audiencia:** Cliente

---

# Acuerdo de Nivel de Servicio (SLA) y Clasificación de Severidad

En Cambiodigital, nos comprometemos a ofrecer un servicio de soporte oportuno y predecible. Este Acuerdo de Nivel de Servicio (SLA) define nuestros tiempos de respuesta garantizados y cómo clasificamos los incidentes para asegurar que los problemas más críticos se atiendan con la máxima prioridad.

## Horario de Cobertura del Soporte

Es importante destacar que nuestros tiempos de respuesta del SLA aplican durante nuestro horario de atención directa:

- **Lunes a Viernes, de 8:00 AM a 6:00 PM (Hora de Colombia)**

Las solicitudes recibidas fuera de este horario serán registradas por nuestro sistema de monitoreo 24/7 y serán atendidas al inicio del siguiente día hábil.

## Tiempos de Respuesta por Plan (SLA)

Nuestro compromiso de respuesta varía según el plan que hayas contratado, reflejando el nivel de prioridad de cada servicio.

| Plan | Tiempo de Primera Respuesta Garantizado (SLA) |
| :--- | :--- |
| **Plan Estándar** | **Menos de 2 horas** |
| **Plan Evolución** | **Soporte VIP Inmediato** (Ver PENDIENTE DE DEFINICIÓN) |

-   **Tiempo de Primera Respuesta:** Este es el tiempo máximo garantizado que tardaremos en acusar recibo de tu solicitud, asignarla a un técnico y comenzar el análisis del problema. **No es el tiempo de resolución final**, ya que la complejidad de cada incidente varía.

## Clasificación de Severidad de Incidentes

Para priorizar los incidentes de manera efectiva, utilizamos un sistema de clasificación de cuatro niveles (S1 a S4). Cuando reportas un problema, nuestro equipo lo evaluará y le asignará una severidad para determinar la urgencia.

| Severidad | Descripción | Ejemplos |
| :--- | :--- | :--- |
| **S1 - Crítico** | **Emergencia.** Una función crítica para el negocio está inoperativa, afectando a todos los usuarios. No existe una solución temporal. | - El sitio web principal está completamente caído.<br>- La base de datos de producción no responde.<br>- Los clientes no pueden procesar pagos.<br>- Se ha confirmado una brecha de seguridad. |
| **S2 - Alto** | **Urgente.** Una función importante del negocio está degradada o no funciona, causando un impacto significativo. Existe una solución temporal parcial o difícil de implementar. | - El rendimiento del sitio es extremadamente lento, afectando la experiencia del usuario.<br>- Una funcionalidad clave (ej. el formulario de contacto) no funciona.<br>- Una automatización de negocio importante ha fallado. |
| **S3 - Medio** | **Normal.** Un problema que no es crítico pero que afecta la operativa normal o causa inconvenientes a los usuarios. Existe una solución temporal. | - Un error visual menor en el sitio web.<br>- Un plugin no funciona como se esperaba, pero no afecta a funciones críticas.<br>- Una pregunta sobre cómo realizar una configuración.<br>- Solicitud de una exportación de datos. |
| **S4 - Bajo** | **Planificado.** Una solicitud de información, una pregunta general o una tarea de bajo impacto que puede ser programada. | - "¿Cuándo podemos agendar la próxima capacitación?".<br>- Solicitud de un cambio menor en el texto de una página.<br>- Preguntas sobre las características del servicio. |

### Proceso de Priorización

Las solicitudes de **Severidad 1 (Crítico)** y **Severidad 2 (Alto)** siempre tendrán prioridad sobre las demás. Nuestro equipo se enfocará en estabilizar y resolver estos problemas antes de pasar a los de menor severidad.

## Monitoreo 24/7 y Alertas

Ambos planes incluyen monitoreo automático 24/7 de tu infraestructura crítica. Si nuestro sistema detecta un incidente grave (como una caída del servidor) fuera del horario de atención, generará una alerta automática. Aunque la resolución por parte de un técnico comenzará en el siguiente día hábil, este monitoreo nos permite actuar de inmediato en cuanto el horario de soporte se reanude.

---

### PENDIENTES DE DEFINICIÓN

1.  **SLA del Plan Evolución:** La promesa de "Soporte VIP Inmediato" es un diferenciador clave, pero necesita una definición cuantitativa para ser un compromiso contractual. Se recomienda establecer un tiempo de respuesta específico y más rápido que el del Plan Estándar.
    -   **Opción A:** Garantizar una respuesta en **menos de 60 minutos**.
    -   **Opción B:** Garantizar una respuesta en **menos de 30 minutos**.
    Esta decisión es crucial para justificar el valor del plan y debe ser incluida en todos los documentos contractuales y de marketing.

2.  **Matriz de Severidad:** El sistema de severidades S1-S4 presentado en este documento **no existe en las fuentes originales** y ha sido creado para llenar un vacío crítico en la estructura del servicio. Se recomienda adoptar formalmente este sistema (o una variación) para estandarizar la priorización de incidentes tanto interna como externamente.
