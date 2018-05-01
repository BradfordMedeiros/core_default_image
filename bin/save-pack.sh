#!/usr/bin/env bash

cd "$(dirname "$0")"

PACKAGE_FOLDER=$1
PACKAGE=$(basename $PACKAGE_FOLDER)
DATA_FOLDER=$(realpath "$PACKAGE_FOLDER/../../data/$PACKAGE")
SAVE_FOLDER_NAME=$(realpath "$PACKAGE_FOLDER/../../packs/$PACKAGE")

[[ -z "$PACKAGE_FOLDER" ]] && echo "false" && exit 1

echo "package is: $PACKAGE"
echo "data folder is: $DATA_FOLDER"

mkdir -p $SAVE_FOLDER_NAME

(
    cd "$DATA_FOLDER/.."
    tar -zcvf "$SAVE_FOLDER_NAME/automate_0.6.dogpak" "$PACKAGE"
)


echo "true" && exit 0