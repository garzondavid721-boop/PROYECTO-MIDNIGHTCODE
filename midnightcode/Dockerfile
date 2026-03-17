FROM node:20-alpine AS builder

WORKDIR /app

# Copiar solo dependencias primero (mejor cache)
COPY package*.json ./

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY src ./src

FROM node:20-alpine

WORKDIR /app

# Copiar solo lo necesario del builder
COPY --from=builder /app /app

# Eliminar devDependencies
RUN npm prune --production

# Seguridad
USER node

EXPOSE 3000

CMD ["node", "src/app.js"]