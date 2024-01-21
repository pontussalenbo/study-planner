# Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version. See the included LICENSE file for
# the full text of the GNU General Public License.

#!/bin/bash

if [ "$1" == "-h" ]; then
    echo "Usage: ./env.sh --dev or ./env.sh --prod"
fi

BUILD_TOP=$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)
export BUILD_TOP
# Make sure we are in the root directory no matter where we are running the script from
cd $BUILD_TOP

# Constants
PROD_COMPOSE_FILE="docker-compose.yml"
DEV_COMPOSE_FILE="docker-compose-dev.yml"
NPM_SCRIPTS_DIR="$BUILD_TOP/common"

# Load environment variables from .env file
source .env

# Download secrets from Doppler and save them to .env file
function doppler_secrets() {
    doppler secrets download --no-file --format env > .env
}

# Start docker containers
# $1: --dev or --prod - which compose file to use (dev or prod mode)
function start_docker() {

    if [ -z "$1" ]; then
        echo "Invalid argument, please use --dev or --prod flag when running."
    fi

    # Check if argument is --prod
    if [ "$1" == "--prod" ]; then
        COMPOSE_FILE=$PROD_COMPOSE_FILE
        echo "Running Docker container in production mode"
    # Check if argument is --dev
    elif [ "$1" == "--dev" ]; then
        COMPOSE_FILE="$PROD_COMPOSE_FILE -f $DEV_COMPOSE_FILE"
        echo "Running Docker container in development mode"
    else
        echo "Invalid argument, please use --dev or --prod flag when running."
        return
    fi

    echo "Starting Docker containers..."
    echo "Using compose file(s): $COMPOSE_FILE"

    docker-compose -f $COMPOSE_FILE up --build
}

# Push Docker image to Heroku
function heroku_release() {
    echo "Building Docker image..."
    docker-compose build app

    # Check if the build was successful
    if [ $? -eq 0 ]; then
        echo "Build successful. Tagging Docker image..."
        docker tag study-planner-app:latest $HEROKU_REGISTRY_WEB_API

        # Prompt the user
        read -p "You are now pushing an image to Heroku. Do you wish to proceed? (y/n) " answer

        case ${answer:0:1} in
            y|Y )
                echo "Pushing Docker image to Heroku..."
                docker push $HEROKU_REGISTRY_WEB_API

                echo "Releasing Docker image to Heroku..."
                heroku container:release web --app $HEROKU_CONTAINER_NAME
            ;;
            * )
                echo "Aborted."
            ;;
        esac
    else
        echo "Build failed. Not pushing Docker image."
    fi
}

# Run database update scripts
function update_db() {
    pushd $NPM_SCRIPTS_DIR
    npm run db:cli
    popd
}