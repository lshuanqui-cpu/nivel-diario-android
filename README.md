# Nivel Diario · app nativa Android

Esta carpeta convierte Nivel Diario en una app Android real (APK) con **Capacitor**. GitHub la compila por ti en la nube: no necesitas instalar Android Studio.

## Qué gana la versión nativa

- **Notificaciones reales** a la hora de cada misión y de tu alarma para despertar, aunque la app esté cerrada. Al tocar la de la alarma se abre la pantalla "Estoy despierta".
- **Vibración háptica** al completar misiones.
- **Boca abajo = enfoque:** si volteas el teléfono 2 segundos arranca el modo enfoque; si lo levantas, Kai te avisa.
- Tus medios y tu progreso se guardan en el teléfono.

## Obtener el APK (unos 10 min)

1. Crea un repositorio nuevo en GitHub (por ejemplo `nivel-diario-android`).
2. **Add file → Upload files** y sube todo el contenido de esta carpeta: `www`, `assets`, `package.json`, `capacitor.config.json` y `README.md`.
3. La carpeta oculta `.github` a veces no se sube arrastrando. Si no aparece: **Add file → Create new file**, escribe como nombre `.github/workflows/android.yml` y pega dentro el contenido de `workflow-android.yml`. Guarda con **Commit changes**.
4. Abre la pestaña **Actions** → "Compilar APK Android". Si no arranca solo, pulsa **Run workflow**.
5. Cuando termine (marca verde, unos 6–8 min), entra a la ejecución y descarga **nivel-diario-apk** (un .zip con `app-debug.apk`).
6. Pasa el APK a tu teléfono Android, ábrelo y permite *instalar apps de origen desconocido*.
7. Al abrir la app, acepta el permiso de notificaciones.

Cada vez que cambies algo en `www/`, GitHub vuelve a compilar el APK.

## Honor / MagicOS (Honor 400 Pro y similares)

MagicOS cierra las apps en segundo plano para ahorrar batería, y eso puede impedir que lleguen las alarmas. Después de instalar (los nombres pueden variar un poco según la versión):

1. **Instalar el APK:** cuando lo pida, permite *Instalar apps desconocidas* para Archivos o Chrome.
2. **Ajustes → Batería → Inicio de aplicaciones → Nivel Diario:** desactiva *Gestionar automáticamente* y activa *Inicio automático*, *Inicio secundario* y *Ejecutar en segundo plano*.
3. **Ajustes → Notificaciones → Nivel Diario:** permite notificaciones y activa banners y sonido.
4. **Ajustes → Apps → Acceso especial → Alarmas y recordatorios:** permítelo para Nivel Diario.
5. Opcional: abre la vista de apps recientes y fija la app (deslízala hacia abajo / ícono de candado).

## iPhone

Para iOS se necesita una Mac con Xcode y una cuenta de Apple Developer: `npx cap add ios`, luego `npx cap open ios` y compilar desde Xcode.

## Lo que aún no hace

- **Bloquear otras apps** (Instagram, TikTok): requiere permisos especiales de Android (Accesibilidad / Uso de apps) y código nativo propio. La "pausa antes de redes" sigue siendo una simulación.
- **Kai con IA real:** hay que conectar tu propia API (por ejemplo, la de Anthropic) mediante un pequeño servidor. Sin eso, Kai usa respuestas predefinidas.
- Calendario, Notas y Salud siguen simulados. Se pueden añadir con plugins de Capacitor.
