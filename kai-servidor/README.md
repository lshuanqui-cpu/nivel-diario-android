# Conectar Kai a una IA real

La app no guarda tu clave de API (cualquiera podría sacarla del APK). En su lugar, Kai habla con un pequeño servidor gratuito en **Cloudflare Workers**, y ese servidor llama a la API de Claude.

App → tu Worker (guarda la clave) → API de Claude

## 1. Clave de API de Anthropic
1. Entra a https://console.anthropic.com y crea una cuenta.
2. Agrega saldo en **Billing**. Pagas por uso y Kai usa un modelo económico. Pon un **límite de gasto mensual**.
3. En **API Keys → Create Key**, copia la clave (empieza con `sk-ant-`).

## 2. Crear el servidor (gratis)
1. Entra a https://dash.cloudflare.com → **Workers & Pages → Create → Create Worker**.
2. Ponle de nombre `kai` y pulsa **Deploy**.
3. Pulsa **Edit code**, borra todo, pega el contenido de `worker.js` y pulsa **Deploy**.
4. Ve a **Settings → Variables and Secrets** y agrega:
   - `ANTHROPIC_API_KEY` (tipo *Secret*): tu clave `sk-ant-…`
   - `APP_TOKEN` (tipo *Secret*): una contraseña que inventes, por ejemplo `despierta-2026`
5. Copia la URL del Worker, algo como `https://kai.tu-usuario.workers.dev`.

## 3. Conectar la app
En Nivel Diario: **Inicio → Configuración → Kai · inteligencia artificial**
- Pega la URL y la contraseña.
- Pulsa **Probar conexión**. Si Kai te saluda, ya está.

Desde ese momento usan la IA real: el chat de Kai, los comentarios sobre tu música, las sugerencias de "tu motivo" y el resumen nocturno.

Si quieres otro modelo, agrega en Cloudflare la variable `MODEL` (por defecto `claude-haiku-4-5`).
