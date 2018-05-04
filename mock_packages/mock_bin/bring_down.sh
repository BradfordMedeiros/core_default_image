#!/usr/bin/env bash

cd "$(dirname "$0")"

[[ -f "./docker-compose.yml" ]] && docker-compose down && exit 0
