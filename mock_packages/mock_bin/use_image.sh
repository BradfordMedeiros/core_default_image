#!/usr/bin/env bash

cd "$(dirname "$0")"

IS_VALID_PATH_BIN_PATH=$(pwd)/../../bin/is-valid-package.sh

PACKAGE_FOLDER=$1
DOCKER_COMPOSE_FILE=$1/docker-compose.yml

result=$($IS_VALID_PATH_BIN_PATH "$PACKAGE_FOLDER")

if [ "$result" = "true" ]; then
    [[ -f "./docker-compose.yml" ]] && docker-compose down && "echo brought shit down"

    cp $DOCKER_COMPOSE_FILE .
    docker-compose up -d
else
    echo "invalid package" && exit 1
fi
