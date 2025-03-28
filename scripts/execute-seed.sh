#!/bin/bash

SEED_FILE=$1

if [ -z "$SEED_FILE" ]; then
  echo "Error: No se proporcionó el nombre del archivo semilla"
  exit 1
fi

docker exec --it rooms-db psql -d rooms_states -U postgres -f database/seeds/$SEED_FILE