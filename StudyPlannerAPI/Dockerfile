# Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version. See the included LICENSE file for
# the full text of the GNU General Public License.

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /backend

# Copy everything
COPY ["StudyPlannerAPI", "./"]
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /backend
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "StudyPlannerAPI.dll"]
