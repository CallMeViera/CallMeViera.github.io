# CallMeViera — Landing page

Landing page estática, responsive y sin dependencias de compilación. HTML5, CSS moderno y JavaScript vanilla.

## Cómo verla

Abre `index.html` directamente en el navegador o sirve la carpeta localmente:

```bash
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Configurar WhatsApp

El número ya está configurado como `5353733997`. Si necesitas cambiarlo, edita la constante en `script.js`:

```js
const WHATSAPP_NUMBER = "5353733997";
```

Escribe el número con código de país, sin `+` y sin espacios. Al cargar la página, esa constante actualiza los 12 botones de WhatsApp y les añade el mensaje:

> Hola CallMeViera, quiero información sobre sus servicios

Los enlaces del HTML llevan el número como respaldo para cuando JavaScript está desactivado. Si lo cambias, reemplázalo también en `index.html`.

## Personalización

- **Precios y servicios:** cada tarjeta es un `<article class="service-card">` en `index.html`.
- **Colores y tipografías:** variables al inicio de `styles.css` (`:root`).
- **Textos del hero, beneficios y contacto:** directamente en `index.html`.
- **Correo:** `vierajose916@gmail.com` aparece en la sección de contacto, el footer y el enlace `mailto:`.
- **SEO:** título, meta descripción, Open Graph y datos estructurados `ProfessionalService` en el `<head>`.

## Despliegue

La carpeta se puede publicar tal cual en Netlify, Vercel, Cloudflare Pages o GitHub Pages. No requiere build.

## Notas

- El año del footer se calcula automáticamente con JavaScript.
- Las animaciones respetan `prefers-reduced-motion`.
- No hay imágenes externas: el visual del hero está hecho con CSS para mantener la carga rápida.
- Auditado con Lighthouse: 100 en Accesibilidad, Buenas prácticas y SEO.
