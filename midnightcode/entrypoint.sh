#!/bin/sh
set -e

echo "Ejecutando migraciones de base de datos..."
npx prisma migrate deploy

# El seed solo se ejecuta si RUN_SEED=true (solo en el primer deploy)
if [ "$RUN_SEED" = "true" ]; then
  echo "Ejecutando seed..."
  npx prisma db seed
fi

echo "Iniciando servidor..."
exec node src/serve.js
