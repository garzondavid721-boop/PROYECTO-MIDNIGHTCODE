FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar package.json desde el mismo directorio (midnightcode)
COPY package*.json ./

RUN npm ci

# Copiar prisma desde el mismo directorio
COPY prisma ./prisma

# Copiar src desde el mismo directorio  
COPY src ./src

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