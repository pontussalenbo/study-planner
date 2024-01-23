-- Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programmes;
CREATE TABLE programmes (
    programme_code TEXT,
    programme_name_sv TEXT,
    programme_name_en TEXT,
    PRIMARY KEY (programme_code)
);

PRAGMA foreign_keys = ON;
