# 🐺 VPN Lobo Rojo - Sitio Web + Gestión de Clientes

Página web para vender tu servicio VPN, con tema de **lobo rojo**, y un panel de administración privado para gestionar clientes, pagos y vencimientos. **Todo está en un solo archivo** (`index.html`), sin necesidad de base de datos ni servidor.

## 📂 Archivos

| Archivo | Qué es |
|---------|--------|
| **`index.html`** | ⭐ El sitio completo: página de ventas + panel de administración (todo junto). Es la que se muestra al publicar con GitHub Pages. |
| `vpn-todo-en-uno.html` | Copia idéntica de `index.html` (respaldo). |
| `README.md` | Este manual. |

## 🚀 Cómo usarla

- **En tu compu:** doble clic en `index.html` y se abre en tu navegador.
- **En internet (gratis):** actívala con GitHub Pages (ver abajo).

## 🔑 Acceder al panel de administración

1. En la página, haz clic en **"Admin"** (arriba a la derecha).
2. Usuario: **`admin`** — Contraseña: **`admin123`**
3. ⚠️ **Cambia la contraseña** antes de usarla en serio (ver "Configuración").

## 💰 Planes configurados

- 🇵🇾 **Paraguay:** ₲ 40.000 / mes
- 🇦🇷 **Argentina:** $ 5.500 / mes

Ambos son planes **mensuales**. Al registrar un cliente, la fecha de vencimiento se calcula automáticamente a **1 mes** desde la activación.

## 📱 WhatsApp configurado

El número está configurado como **595 991 907 709**. Todos los botones de contratar y las solicitudes de prueba llegan a ese WhatsApp.

## 🧑‍💼 Panel de administración

- **Dashboard:** total de clientes, activos, por vencer (7 días) y pagos pendientes.
- **Clientes:** agregar, editar, eliminar. Controla el estado de pago:
  - 🟢 **Pagado** · 🔴 **Pendiente** · 🟡 **Pago Parcial**
- **Solicitudes de Prueba:** las personas que piden prueba desde la web aparecen aquí; los contactas por WhatsApp con un clic.
- **Alertas:** avisos automáticos de servicios vencidos, por vencer y pagos pendientes/parciales.

> 💾 Los datos se guardan en el navegador (localStorage). Usa siempre el mismo navegador y no borres los datos de navegación para no perder la información.

## ⚙️ Configuración (editar el archivo `index.html`)

Abre `index.html` con el Bloc de notas y busca:

1. **Número de WhatsApp:** `const MI_WHATSAPP = '595991907709';` → cámbialo si hace falta (formato internacional, sin el +).
2. **Contraseña del admin:** `password: 'admin123'` → ponle una contraseña tuya.
3. **Precios:** busca `40.000` o `5.500` para ajustarlos.
4. **Redes sociales:** busca `t.me/tu_usuario`, `instagram.com/tu_usuario`, `facebook.com/tu_pagina` y pon tus enlaces reales.

## 🌐 Publicar gratis con GitHub Pages

1. En este repositorio ve a **Settings** → **Pages**.
2. En **Branch** elige **`main`** y carpeta **`/ (root)`**, y guarda.
3. En unos minutos tu sitio estará en:
   `https://loborojoparaguay-cyber.github.io/vpn-website-lobo/`

---

🐺 **¡Éxitos con VPN Lobo Rojo!**
