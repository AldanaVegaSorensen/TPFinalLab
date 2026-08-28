# Requisitos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- Expo CLI / Expo
- Android Studio con un emulador Android, o un dispositivo físico con Expo Go
- Una cuenta y API Key de TMDB

## Configuración de TMDB

La aplicación utiliza la API de The Movie Database (TMDB).

Es necesario crear una API Key y configurarla en el backend mediante un archivo `.env`.

Dentro de la carpeta `backend`, crear el archivo `.env` con el siguiente contenido:

```
TMDB_API_KEY=TU_API_KEY
PORT=3000
```

Reemplazar `TU_API_KEY` por la API Key obtenida de TMDB.

`

## ▶️ Instalación

Primero clonar o descargar el proyecto.

Luego instalar las dependencias del backend:

```bash
cd backend
npm install
```

Después instalar las dependencias del frontend:

```bash
cd ../movieapp
npm install
```

## 🚀 Ejecución del proyecto

La aplicación requiere ejecutar backend y frontend simultáneamente.

### 1. Iniciar el backend

Abrir una terminal y ejecutar:

```bash
cd backend
node src/app.js
```

El servidor quedará disponible en:

```
http://localhost:3000
```

El puerto puede variar si se configura otro valor en el archivo `.env`.

### 2. Configurar la dirección del backend

El frontend necesita conocer la dirección IP de la computadora donde se ejecuta el backend.

Esto es especialmente importante cuando se prueba la aplicación desde un celular físico o un emulador Android.

Por ejemplo:

```
http://192.168.1.100:3000
```

La IP debe corresponder a la dirección IPv4 de la computadora dentro de la red local.

> ⚠️ No utilizar `localhost` cuando la aplicación se ejecuta desde un dispositivo físico, ya que `localhost` hace referencia al propio dispositivo.

Si se cambia de red Wi-Fi, la dirección IP local puede cambiar, por lo que puede ser necesario actualizar la URL del backend.

### 📱 Ejecutar el frontend

Abrir otra terminal:

```bash
cd movieapp
```

Luego ejecutar:

```bash
npx expo start
```

Esto iniciará el servidor de desarrollo de Expo.

Desde allí se puede ejecutar la aplicación mediante:

**Expo Go**

Escanear el código QR utilizando la aplicación Expo Go.

**Android Emulator**

Con un emulador Android iniciado desde Android Studio, ejecutar:

```bash
npx expo start
```

y luego seleccionar la opción correspondiente para abrir la aplicación en Android.