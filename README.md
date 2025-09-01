# Plant System Backend

## 1. Clonar el repositorio

```bash
git clone https://github.com/NestMicroservices/plant-system-backend.git
cd plant-system-backend
```

## 2. Instalación de dependencias

```bash
npm install
```

## 3. Variables de entorno

Copia el archivo `.env.template` como `.env`:

Edita `.env` según tu entorno y credenciales.

## 4. Configuración de base de datos

Asegúrate de tener la variable `DATABASE_URL` correctamente configurada en tu archivo `.env` para conectar con PostgreSQL.

## 5. Levantar la base de datos con Docker

> **Nota:** Si no tienes Docker instalado, descárgalo desde [https://www.docker.com/get-started/](https://www.docker.com/get-started/)

Ejecuta:

```bash
docker compose up -d
```

Esto creará y levantará el contenedor de PostgreSQL definido en `docker-compose.yml`.

## 6. Migraciones y generación de Prisma Client

```bash
npx prisma migrate deploy
npx prisma generate
```

## 7. Seed de datos

```bash
npm run seed
```

## 8. Levantar el proyecto

```bash
npm run start:dev
```

---

Este backend está construido con NestJS, Prisma y PostgreSQL. Incluye entidades, repositorios y seed para pruebas y desarrollo.
