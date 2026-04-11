# CitaFácil — Demo

**Sistema de reservas online para barberías y peluquerías.**

Demo interactiva de CitaFácil: un SaaS que da a cada barbería su propia web con reservas online y panel de gestión privado.

---

## Páginas del demo

| Página | Descripción | Audiencia |
|--------|-------------|-----------|
| [`index.html`](index.html) | Landing de CitaFácil (marketing del SaaS) | Tú, vendiendo el producto |
| [`reservar.html`](reservar.html) | Web de "Barbería El Maestro" con reserva online | El cliente final del peluquero |
| [`panel.html`](panel.html) | Panel de gestión del peluquero | El peluquero (tu cliente) |

## Cómo usar

1. Clona o descarga este repositorio
2. Abre cualquier `.html` en tu navegador
3. No necesitas servidor, base de datos ni internet

### Con GitHub Pages

Este repo funciona directamente con GitHub Pages:

1. Ve a **Settings → Pages** en tu repositorio
2. En **Source** selecciona `main` branch, carpeta `/ (root)`
3. Tu demo estará disponible en `https://tu-usuario.github.io/citafacil-demo/`

## Qué incluye

### Web del peluquero (`reservar.html`)
- Hero con imagen de barbería real
- Sección "Nosotros" con fotos e historia
- Lista de 5 servicios (sin precios visibles)
- Galería fotográfica
- Flujo de reserva completo en 5 pasos
- Calendario interactivo con disponibilidad
- Validación de formulario (nombre, teléfono, RGPD)
- Menú móvil responsive
- Sección de contacto

### Panel del barbero (`panel.html`)
- Dashboard con KPIs (citas, ingresos, no-shows)
- Lista de citas del día con estados
- Gráfico de ingresos semanal
- Gestión de servicios (tabla CRUD)
- Base de clientes con historial
- Vista de agenda semanal
- Navegación entre secciones

### Landing SaaS (`index.html`)
- Página de marketing para vender CitaFácil
- Secciones de características, cómo funciona, beneficios
- Llamadas a la acción

## Stack técnico

- HTML5, CSS3 vanilla, JavaScript vanilla
- Sin dependencias, sin frameworks, sin build tools
- Google Fonts (Inter + Cormorant Garamond)
- Responsive design (mobile-first)
- Compatible con cualquier navegador moderno

## Notas

- **Es un demo visual**: no tiene backend, base de datos ni persistencia
- Las reservas no se guardan — es un mockup interactivo para mostrar el producto
- Los días/horas ocupadas en el calendario son simulados
- Las imágenes son fotos reales incluidas en el repositorio

## Próximos pasos (producción)

Para convertir esto en producto real:

1. **Next.js 14** (App Router) como framework
2. **Supabase** (PostgreSQL) para base de datos
3. **Arquitectura multi-tenant**: cada barbería con su dominio
4. **Stripe** para cobros de suscripción
5. **Resend** para emails transaccionales

---

Creado con fines de demostración comercial.
