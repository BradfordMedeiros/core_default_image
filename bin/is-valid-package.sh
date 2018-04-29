#!/usr/bin/env bash

cd "$(dirname "$0")"


PACKAGE_FOLDER=$1
MANIFEST_FILE=$1/manifest.json
DOCKER_COMPOSE_FILE=$1/docker-compose.yml

[[ -z "$PACKAGE_FOLDER" ]] && echo "false" && exit 1
[[ ! -d "$PACKAGE_FOLDER" ]] && echo "false" && exit 1
[[ ! -f "$MANIFEST_FILE" ]] && echo "false" && exit 1
[[ ! -f "$DOCKER_COMPOSE_FILE" ]] && echo "false" && exit 1

echo "true" && exit 0