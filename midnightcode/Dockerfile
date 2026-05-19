FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# copiar prisma schema
COPY prisma ./prisma

# copiar código fuente
COPY src ./src

# generar cliente prisma
RUN npx prisma generate

# Segunda etapa para producción
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar desde builder
COPY --from=builder /usr/src/app /usr/src/app

# Instalar solo dependencias de producción
RUN npm prune --production

# Crear usuario no root
RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node src/serve.js"]