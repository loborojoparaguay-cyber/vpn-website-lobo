# 🛡️ VPN Premium - Sistema de Gestión y Ventas

Una página web completa para vender servicios VPN con panel de administración integrado para gestionar clientes, pagos y vencimientos.

## 📋 Características

### Página Pública (index.html)
- ✅ Landing page moderna y atractiva
- ✅ Información detallada de características VPN
- ✅ Planes de precios (Mensual, Trimestral, Anual)
- ✅ Enlaces directos a WhatsApp, Telegram, Instagram, Facebook
- ✅ Formulario de solicitud de prueba gratuita
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Animaciones y efectos visuales

### Panel de Administración (admin.html)
- ✅ Sistema de login seguro
- ✅ Dashboard con estadísticas en tiempo real
- ✅ Gestión completa de clientes (CRUD)
- ✅ Control de pagos (Pagado, Pendiente, Parcial)
- ✅ Alertas automáticas de vencimientos
- ✅ Gestión de solicitudes de prueba
- ✅ Filtros y búsqueda de clientes
- ✅ Integración con WhatsApp
- ✅ Cálculo automático de fechas

## 🚀 Instalación

### Opción 1: Uso Local (Sin servidor)
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo para usar!

### Opción 2: Con Servidor Web
```bash
# Si tienes Python instalado
python -m http.server 8000

# Si tienes Node.js instalado
npx http-server
```

Luego abre: `http://localhost:8000`

## ⚙️ Configuración Importante

### 1. Cambiar Número de WhatsApp
Edita el archivo `js/main.js` y busca:
```javascript
const phoneNumber = '1234567890'; // CAMBIA POR TU NÚMERO
```
**Importante:** Usa el formato internacional sin el símbolo +
- Ejemplo: Si tu número es +52 123 456 7890
- Pon: `'5212345678907'`

### 2. Enlaces de Redes Sociales
Edita `index.html` en la sección de contacto:
```html
<a href="https://wa.me/TU_NUMERO" ...>WhatsApp</a>
<a href="https://t.me/tu_usuario" ...>Telegram</a>
<a href="https://instagram.com/tu_usuario" ...>Instagram</a>
<a href="https://facebook.com/tu_pagina" ...>Facebook</a>
```

### 3. Precios de Planes
Edita `index.html` en la sección de planes:
```html
<span class="amount">9.99</span>   <!-- Cambia los precios -->
<span class="amount">24.99</span>
<span class="amount">79.99</span>
```

### 4. Credenciales de Administrador
Edita `js/admin.js`:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'admin',        // Cambia el usuario
    password: 'admin123'      // Cambia la contraseña
};
```
**⚠️ MUY IMPORTANTE:** Cambia estas credenciales antes de publicar tu sitio.

## 🎯 Uso del Sistema

### Panel de Administración

#### Acceso
1. Haz clic en el botón "Admin" en la navegación
2. Usuario por defecto: `admin`
3. Contraseña por defecto: `admin123`

#### Dashboard
- Visualiza estadísticas generales
- Total de clientes
- Clientes activos
- Clientes por vencer (próximos 7 días)
- Pagos pendientes
- Alertas recientes

#### Gestión de Clientes

**Agregar Cliente:**
1. Click en "Nuevo Cliente"
2. Llena el formulario:
   - Nombre completo
   - WhatsApp (con código de país)
   - Email (opcional)
   - Plan (el sistema calcula automáticamente la fecha de vencimiento)
   - Fecha de activación
   - Estado de pago
   - Monto
   - Notas adicionales
3. Click en "Guardar Cliente"

**Editar Cliente:**
- Click en el ícono de lápiz (✏️)
- Modifica los datos necesarios
- Guarda los cambios

**Eliminar Cliente:**
- Click en el ícono de basura (🗑️)
- Confirma la eliminación

**Contactar Cliente:**
- Click en el ícono de WhatsApp (💬)
- Se abre WhatsApp Web con el número del cliente

#### Filtros de Clientes
- **Búsqueda:** Por nombre o WhatsApp
- **Estado:** Activos, Vencidos, Por Vencer
- **Pago:** Pagado, Pendiente, Parcial

#### Solicitudes de Prueba
- Visualiza todas las solicitudes de prueba
- Contacta directamente por WhatsApp
- Elimina solicitudes procesadas
- Limpia todas las solicitudes

#### Sistema de Alertas
El sistema genera alertas automáticas para:
- ⚠️ Servicios vencidos
- ⏰ Servicios por vencer (7 días antes)
- 💰 Pagos pendientes
- 💵 Pagos parciales

## 📱 Características del Sistema

### Almacenamiento
- Los datos se guardan en `localStorage` del navegador
- No requiere base de datos
- Los datos persisten entre sesiones
- Fácil de exportar/importar

### Cálculo Automático de Fechas
Cuando seleccionas un plan, el sistema calcula automáticamente:
- **Mensual:** +1 mes desde la fecha de activación
- **Trimestral:** +3 meses desde la fecha de activación
- **Anual:** +1 año desde la fecha de activación

### Estados de Cliente
El sistema clasifica automáticamente a los clientes:
- **Activo** (verde): Más de 7 días para vencer
- **Por Vencer** (amarillo): Menos de 7 días para vencer
- **Vencido** (rojo): Ya pasó la fecha de vencimiento

### Estados de Pago
- **Pagado** (verde): Cliente al día
- **Pago Parcial** (amarillo): Pagó parte del monto
- **Pendiente** (rojo): No ha pagado

## 🎨 Personalización

### Cambiar Colores
Edita `css/styles.css`:
```css
:root {
    --primary-color: #667eea;    /* Color principal */
    --secondary-color: #764ba2;  /* Color secundario */
    --accent-color: #f093fb;     /* Color de acento */
    /* ... más colores */
}
```

### Cambiar Logotipo
Edita `index.html` en la sección del navbar:
```html
<div class="logo">
    <i class="fas fa-shield-alt"></i> <!-- Cambia el ícono -->
    <span>VPN Premium</span>         <!-- Cambia el nombre -->
</div>
```

### Agregar Más Características
Edita la sección de características en `index.html`:
```html
<div class="feature-card">
    <i class="fas fa-TU-ICONO"></i>
    <h3>Tu Título</h3>
    <p>Tu descripción</p>
</div>
```

## 📊 Exportar/Importar Datos

### Exportar Datos
Abre la consola del navegador (F12) y ejecuta:
```javascript
// Exportar clientes
console.log(localStorage.getItem('vpn_clients'));

// Exportar solicitudes de prueba
console.log(localStorage.getItem('vpn_trials'));
```
Copia el texto y guárdalo en un archivo.

### Importar Datos
```javascript
// Importar clientes
localStorage.setItem('vpn_clients', 'TU_JSON_AQUI');

// Importar solicitudes
localStorage.setItem('vpn_trials', 'TU_JSON_AQUI');
```

## 🌐 Publicar en Internet

### Opción 1: GitHub Pages (GRATIS)
1. Crea una cuenta en GitHub
2. Crea un nuevo repositorio
3. Sube todos los archivos
4. Ve a Settings > Pages
5. Selecciona la rama main
6. Tu sitio estará en: `https://tu-usuario.github.io/nombre-repo`

### Opción 2: Netlify (GRATIS)
1. Crea una cuenta en Netlify
2. Arrastra la carpeta del proyecto
3. Tu sitio estará listo en minutos

### Opción 3: Vercel (GRATIS)
1. Crea una cuenta en Vercel
2. Importa desde GitHub o sube directamente
3. Despliega automáticamente

## 🔒 Seguridad

### Recomendaciones:
1. **Cambia las credenciales de admin** inmediatamente
2. No uses este sistema para información muy sensible
3. Para producción real, considera:
   - Backend con base de datos real
   - Autenticación robusta (JWT, OAuth)
   - Cifrado de datos sensibles
   - HTTPS obligatorio

### Limitaciones del localStorage:
- Datos visibles en el navegador
- Límite de ~5-10MB
- Se puede limpiar fácilmente
- No es seguro para datos críticos

## 📁 Estructura de Archivos

```
vpn-website/
│
├── index.html          # Página principal pública
├── admin.html          # Panel de administración
├── README.md           # Este archivo
│
├── css/
│   ├── styles.css      # Estilos de la página principal
│   └── admin.css       # Estilos del panel admin
│
└── js/
    ├── main.js         # JavaScript página principal
    └── admin.js        # JavaScript panel admin
```

## 💡 Tips de Uso

1. **Revisa el Dashboard diariamente** para ver alertas
2. **Contacta a clientes por vencer** con 7 días de anticipación
3. **Marca como Pagado** solo cuando confirmes el pago
4. **Usa el estado Parcial** para clientes que pagaron una parte
5. **Agrega Notas** para recordar detalles importantes del cliente
6. **Limpia las solicitudes de prueba** procesadas regularmente

## 🐛 Solución de Problemas

### Los datos desaparecen
- Verifica que no estés en modo incógnito
- Revisa que no hayas limpiado el caché del navegador
- Exporta los datos regularmente como respaldo

### No funcionan los enlaces de WhatsApp
- Verifica que el número esté en formato internacional
- No incluyas el símbolo +
- Ejemplo correcto: `5212345678907`

### El panel de admin no carga
- Limpia el caché del navegador
- Verifica la consola del navegador (F12) por errores
- Asegúrate de que todos los archivos estén en su lugar

## 📞 Soporte

Si necesitas ayuda o tienes preguntas:
- Revisa este README completo
- Verifica la consola del navegador por errores
- Asegúrate de seguir todos los pasos de configuración

## 🎉 Características Futuras Sugeridas

- [ ] Sistema de notificaciones por email
- [ ] Reportes en PDF
- [ ] Gráficas de ingresos
- [ ] Integración con métodos de pago
- [ ] Sistema de tickets de soporte
- [ ] Aplicación móvil
- [ ] Multi-idioma
- [ ] Tema oscuro

## 📝 Licencia

Este proyecto es de uso libre. Puedes modificarlo y adaptarlo según tus necesidades.

---

**¡Buena suerte con tu negocio de VPN!** 🚀
