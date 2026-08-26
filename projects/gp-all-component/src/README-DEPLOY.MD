# Flujo para crear y publicar una nueva versión de la librería `gp-all-component`

## 1. Cambiar la versión de la librería

- Edita el archivo `package.json` y demás sitios si fuese necesario.
- Modifica el campo `"version"` con la nueva versión deseada, por ejemplo:

```json
"version": "1.6.5-SNAPSHOT"
```

## 2. Compilar la librería

Abre una terminal en la raíz del proyecto y ejecuta:

```bash
ng build gp-all-component
```

> Si ocurre un error `EBUSY`, elimina manualmente la carpeta `dist`.

## 3. Copiar la carpeta SCSS al dist

Ejecuta el script para copiar los SCSS:

```bash
node scripts/copy-scss-to-dist.js
```

## 4. Generar el paquete npm (.tgz)

Ve a la carpeta generada:

```bash
cd dist/gp-all-component
```

Ejecuta:

```bash
npm pack
```

Esto generará un archivo `.tgz` con el nombre y versión especificados en el `package.json`.

## 5. Publicar la librería en el servidor

Vuelve a la raíz del proyecto:

```bash
cd ../..
```

Ejecuta el script de despliegue:

```bash
node scripts/deploy-gp-all-component.js
```

El script se encargará de subir el archivo `.tgz` al servidor o repositorio correspondiente.

## 6. Verificar la publicación

Confirma que la nueva versión está disponible en el servidor o repositorio destino.

Abre un navegador en: <http://software.cen.intranet/angular/gp-all-component>
