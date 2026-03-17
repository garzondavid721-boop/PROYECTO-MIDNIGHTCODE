FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

# copiar prisma schema
COPY prisma ./prisma

# generar cliente prisma
RUN npx prisma generate

# copiar código fuente
COPY src ./src

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

RUN npm prune --production

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/app.js"]