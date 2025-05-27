# Api Redis Turismo

## Para correr de manera local

#### 1. Clonar el repositorio
```ts
https://github.com/patriciogagietta/redis-capitulos-mandalorian.git
```

#### 2. Ir a la ruta del proyecto
```ts
cd redis-capitulos-mandalorian
```

#### 3. Ir a la ruta del backend, instalar las dependencias y correr el servidor
```ts
cd back
npm install
node insdex.js
```

#### 4. En otra terminal, ir a la ruta del frontend, instalar las dependencias y correr el servidor
```ts
cd front
npm install
npm run dev
```

- El backend estara disponible en http://localhost:3000/

- El frontend estara disponible en http://localhost:5173/

## Para correr el proyecto con docker

#### 1. Tener Docker y Docker Compose instalados

#### 2. Desde la raiz del proyecto, construir los contenedores y levantarlos de la siguiente manera

```ts
docker compose build
docker compose up
```

Esto iniciara:

- El backend en el puerto 3000

- El frontend en el puerto 5173

- Redis en el puerto 6379