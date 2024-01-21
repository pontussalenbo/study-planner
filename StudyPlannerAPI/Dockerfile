# Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version. See the included LICENSE file for
# the full text of the GNU General Public License.

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /App

# Copy the project file
COPY ["StudyPlannerAPI/StudyPlannerAPI.csproj", "./"]

# Restore as distinct layers
RUN dotnet restore

# Copy the rest of the code
COPY ["StudyPlannerAPI", "./"]

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /App
COPY --from=build-env /App/out .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet StudyPlannerAPI.dll
