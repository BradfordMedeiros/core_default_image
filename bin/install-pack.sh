#!/usr/bin/env bash

cd "$(dirname "$0")"

PACKAGE_FOLDER=$1
PACKAGE=$(basename $PACKAGE_FOLDER)
DATA_FOLDER=$(realpath "$PACKAGE_FOLDER/../../data/")
SAVE_FOLDER_NAME=$(realpath "$PACKAGE_FOLDER/../../packs/$PACKAGE")
DOGPAK_NAME="$SAVE_FOLDER_NAME/automate_0.6.dogpak"

[[ -z "$PACKAGE_FOLDER" ]] && echo "false" && exit 1

echo "package is: $PACKAGE"
echo "package folder is: $PACKAGE_FOLDER"
echo "data folder is: $DATA_FOLDER"
echo "save folder is: $SAVE_FOLDER_NAME"
echo "dogpak is: $DOGPAK_NAME"

tar -xvf $DOGPAK_NAME --directory "$DATA_FOLDER/"

echo "true" && exit 0