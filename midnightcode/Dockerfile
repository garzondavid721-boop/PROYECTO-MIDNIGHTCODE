FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Ahora sí, midnightcode existe en el contexto porque subimos un nivel
COPY midnightcode/package*.json ./

RUN npm ci

COPY midnightcode/prisma ./prisma
COPY midnightcode/src ./src

RUN npx prisma generate

FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

RUN npm prune --production

RUN addgroup -S nodejs && adduser -S nodeuser -G nodejs
USER nodeuser

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && node src/serve.js"]