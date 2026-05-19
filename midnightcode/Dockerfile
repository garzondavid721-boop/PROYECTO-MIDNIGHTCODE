FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar package.json desde midnightcode
COPY midnightcode/package*.json ./

RUN npm ci

# Copiar prisma desde midnightcode
COPY midnightcode/prisma ./prisma

# Copiar src desde midnightcode
COPY midnightcode/src ./src

# Copiar tests (si es necesario para el build)
COPY midnightcode/tests ./tests

# generar cliente prisma
RUN npx prisma generate

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

RUN npm prune --production

RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node src/serve.js"]