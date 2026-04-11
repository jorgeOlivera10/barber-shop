# Isolvia — Software de Gestión Premium

**La evolución digital de la barbería y peluquería clásica.**

Demo interactiva de Isolvia: una plataforma que respeta la artesanía de tu negocio, con una página de reservas web, agenda digital integral y panel directivo.

---

## Páginas del demostrador

| Página | Descripción | Audiencia |
|--------|-------------|-----------|
| [`index.html`](index.html) | Presentación del Software Isolvia | Tú, comercializando la plataforma |
| [`reservar.html`](reservar.html) | Web tipo "Barbería El Maestro" con reservas | El cliente final del negocio |
| [`panel.html`](panel.html) | Panel de dirección y logística | El dueño / profesional del negocio |

## Cómo usar el MVP

1. Descarga o clona este repositorio.
2. Ejecuta `index.html` en cualquier navegador web.
3. Operatividad inmediata sin bases de datos adicionales requeridas.

### Despliegue en GitHub Pages

Accesible vía URL pública para enviar fácilmente a clientes:

1. Dirígete a **Settings → Pages** en este repositorio.
2. Configura el **Source** principal en el branch `master`, apuntando a la raíz `/ (root)`.
3. Tu ecosistema Isolvia se desplegará. 

## Atributos del Entorno

### Módulo de Cliente Final (`reservar.html`)
- Interfaz premium estilizada para negocios artesanales.
- Histórico representativo e identificativo visual.
- Catálogo de servicios enfocado al cuidado exclusivo.
- Algoritmo visual de reserva de 5 etapas guiadas.
- Calendario inteligente interactivo.
- Cuestionario adaptado al RGPD.
- Navegación optimizada para dispositivos móviles (Responsive UI).

### Módulo de Dirección (`panel.html`)
- Dashboard analítico con KPI's del negocio.
- Agenda visual segmentada.
- Registro visual de ingresos.
- Entorno de control de inventario de servicios y tarifas.
- Ficha clínica de clientes (histórico).
- Interfaz intuitiva enfocada en agilidad.

### Entorno Corporativo - Landing (`index.html`)
- Identidad estética sobria y premium para un mercado selecto.
- Detalle arquitectónico del sistema. 
- Transparencia en licencias de software (Studio / Atelier).

## Tecnología

- Stack nativo: HTML5 / CSS3 / Vanilla JS.
- Rendimiento elevado (No Node, no compilación).
- Tipografías profesionales (Cormorant Garamond, Inter).

## Siguientes Pasos Evolutivos

La estructura está planteada para transicionar hacia un SaaS arquitectónico real:
1. Capa lógica en `Next.js 14`.
2. Persistencia en `Supabase/PostgreSQL`.
3. Resolución multinominada para negocios individuales (cada negocio con su web/url).
4. Motor de pagos integrado con Stripe.

---
*MVP desarrollado exclusivamente como activo comercial y demostrador B2B.*
