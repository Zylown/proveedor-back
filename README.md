<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>
</p>

<p align="center">
  A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" />
  </a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank">
    <img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" />
  </a>
  <a href="https://circleci.com/gh/nestjs/nest" target="_blank">
    <img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" />
  </a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank">
    <img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord" />
  </a>
  <a href="https://opencollective.com/nest#backer" target="_blank">
    <img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" />
  </a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank">
    <img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" />
  </a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank">
    <img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us" />
  </a>
  <a href="https://opencollective.com/nest#sponsor" target="_blank">
    <img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us" />
  </a>
  <a href="https://twitter.com/nestframework" target="_blank">
    <img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter" />
  </a>
</p>

---

# 🧾 Proveedor API

API REST desarrollada con **NestJS**, **TypeORM** y **PostgreSQL** para la gestión de proveedores.  
Incluye validaciones con **Zod**, manejo de errores de NestJS y una estructura modular limpia.

---

## 🚀 Tecnologías principales

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Zod](https://zod.dev/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [JWT](https://jwt.io/) (en desarrollo)

---

## ⚙️ Instalación

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/proveedor-back.git
cd proveedor-back
```

# Instalar Dependencias

```bash

$ bun install

```

# Configurar variables de entorno

```bash
# Renombrar el archivo .env.example a .env

DB_HOST=aws-1-**-****-*.*******.********.com
DB_PORT=****
DB_USER=******.***********
DB_PASSWORD=*********
DB_DB=*******


⚠️ Estas variables son usadas por TypeORM para conectarse a la base de datos PostgreSQL.

```

### Ejecutar la aplicación

```bash
bun run start:dev

```

## 📚 Documentación de la API

## 🔌 Endpoints

### Proveedor

| Método   | Endpoint                          | Descripción                       | Códigos de respuesta                |
| :------- | :-------------------------------- | :-------------------------------- | :---------------------------------- |
| `GET`    | `/proveedor`                      | Lista todos los proveedores       | `200 OK`                            |
| `GET`    | `/proveedor/:id`                  | Obtiene un proveedor por ID       | `200 OK`, `400 Bad Request`         |
| `POST`   | `/proveedor`                      | Crea proveedor (validado con Zod) | `201 Created`, `400 Bad Request`    |
| `DELETE` | `/proveedor/:id`                  | Elimina proveedor por ID          | `204 No Content`, `400 Bad Request` |
| `GET`    | `/proveedor/count/total`          | Total de proveedores              | `200 OK`                            |
| `GET`    | `/proveedor/listar/con-categoria` | Proveedores con su categoría      | `200 OK`                            |

### Dashboard

| Método | Endpoint                        | Descripción                                                                           | Códigos de respuesta |
| :----- | :------------------------------ | :------------------------------------------------------------------------------------ | :------------------- |
| `GET`  | `/dashboard/kpis`               | KPIs principales (proveedores, órdenes activas, pagos pendientes, etc.)               | `200 OK`             |
| `GET`  | `/dashboard/actividad-reciente` | Highlights: última orden completada, última entrega retrasada, último proveedor nuevo | `200 OK`             |
| `GET`  | `/dashboard/featured`           | Proveedores destacados del mes (desempeño, puntualidad, calidad)                      | `200 OK`             |

### Órdenes

| Método | Endpoint          | Descripción                                                                                   | Query params (opc.)                                                             | Códigos  |
| :----- | :---------------- | :-------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :------- |
| `GET`  | `/orders`         | **Órdenes registradas** (lista completa; ordenadas por fecha_emision desc)                    | `page`, `limit`, `proveedor`, `estado` (`pendiente`\|`completada`\|`cancelada`) | `200 OK` |
| `GET`  | `/orders/summary` | **Resumen de órdenes** (completadas, pendientes, canceladas, variación % mes vs mes anterior) | —                                                                               | `200 OK` |

> Nota: si no envías `estado` en `/orders`, por defecto lista **pendientes** (configurable en el servicio).

### Entregas

| Método | Endpoint           | Descripción                                                               | Códigos  |
| :----- | :----------------- | :------------------------------------------------------------------------ | :------- |
| `GET`  | `/entrega`         | **Entregas registradas** (con proveedor y dirección)                      | `200 OK` |
| `GET`  | `/entrega/resumen` | **Resumen de entregas** (entregadas, en tránsito, retrasadas, canceladas) | `200 OK` |

> Estado de presentación en la lista:  
> `completada` → **Entregado** · `pendiente` → **En tránsito** (el front puede marcar **Retrasado** si la estimada ya venció) · `cancelada` → **Cancelado**.

### Facturas

| Método | Endpoint            | Descripción                                                                           | Códigos  |
| :----- | :------------------ | :------------------------------------------------------------------------------------ | :------- |
| `GET`  | `/invoices`         | **Facturas registradas** (con proveedor, estado presentado: Pagado/Pendiente/Vencido) | `200 OK` |
| `GET`  | `/invoices/summary` | **Resumen financiero** (pagadas, pendientes, vencidas, total ingresado por pagos)     | `200 OK` |

---
