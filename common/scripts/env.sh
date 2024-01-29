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

# Create symbolic link to internal repo if running on Windows
# Needed for VS Code to show the internal repo in the file explorer
if command -v powershell.exe >/dev/null 2>&1; then
    powershell.exe -Command "Start-Process PowerShell -ArgumentList '-NoProfile -ExecutionPolicy Bypass -Command \"cd $(wslpath -w $(pwd)); New-Item -ItemType SymbolicLink -Path internal -Target ../study-planner-internal\"' -Verb RunAs"
else
    ln -s  $BUILD_TOP/../study-planner-internal $BUILD_TOP/internal
fi

# Display help regarding the functions in this script
function env_help() {

cat <<EOF

Invoke "source common/script/env.sh" from your shell to add the following functions to your environment:

- doppler_secrets:    Download secrets from Doppler and save them to .env file.
- dotnet_cert_setup:  Setup .NET Core HTTPS development certificate.
- start_docker:       Start Docker containers (--dev) or (--prod).
- heroku_release:     Push Docker image to Heroku PRODUCTION.
- update_db:          Run database update scripts.

EOF
}

function _execute_in_build_top() {
    # Save the current directory
    local old_dir=$(pwd)

    # Change to the BUILD_TOP directory
    pushd $BUILD_TOP > /dev/null

    # Execute the function passed as the first argument
    $1

    # Change back to the old directory
    popd > /dev/null
}

# Download secrets from Doppler and save them to .env file
function doppler_secrets() {
    _execute_in_build_top doppler secrets download --no-file --format env > .env
}

# Generate .NET Core HTTPS development certificate
function dotnet_cert_setup() {
    sudo dotnet dev-certs https -ep ~/.aspnet/https/aspnetapp.pfx -p $DOTNET_CERT_PASSWORD
}

# Start docker containers
# $1: --dev or --prod - which compose file to use (dev or prod mode)
function start_docker() {
    pushd $BUILD_TOP > /dev/null

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

    popd > /dev/null

    EXIT_CODE=$?

    if [ $EXIT_CODE -eq 1 ]; then
        echo -e "docker-compose failed with exit code $EXIT_CODE, is Docker running?\n"
        echo "HINT: If you are running Docker on Windows, make sure that Docker Desktop is running."
    fi
}

function docker_start() {
    start_docker $1
}

# Push Docker image to Heroku
function heroku_release() {
    pushd $BUILD_TOP > /dev/null
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

    popd > /dev/null
}

# Run database update scripts
function update_db() {
    pushd $NPM_SCRIPTS_DIR
    npm run db:cli
    popd
}

function fetch_courses() {
    pushd $NPM_SCRIPTS_DIR
    npm run courses
    popd
}