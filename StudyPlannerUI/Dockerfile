# Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version. See the included LICENSE file for
# the full text of the GNU General Public License.

# Use a specific version of node
FROM node:20-slim AS base

# Set the working directory in the Docker container
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml files
COPY StudyPlannerUI/package.json StudyPlannerUI/pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of your app's source code
COPY StudyPlannerUI/ .

# Expose the port the app runs on
EXPOSE 5173

# Command to run the app
CMD ["pnpm", "run", "serve"]