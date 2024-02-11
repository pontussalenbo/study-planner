# Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version. See the included LICENSE file for
# the full text of the GNU General Public License.

#!/bin/bash

myArray=(
  "courses"
  "masters"
  "programmes"
  "programme_master_course_class"
  "programme_master_course_year"
  "course_period_year"
  "course_period_class"
)
pushd $BUILD_TOP/common/db > /dev/null

echo "Creating database tables..."
PGPASSWORD=$DOTNET_CERT_PASSWORD psql -h localhost -U postgres -d studyplanner -f tables/psql/all.sql

for element in "${myArray[@]}"; do
    echo "Seeding $element..."
    PGPASSWORD=$DOTNET_CERT_PASSWORD psql -h localhost -U postgres -d studyplanner -f $BUILD_TOP/internal/common/db/data/$element.sql
done

popd > /dev/null