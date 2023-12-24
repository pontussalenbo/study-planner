-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS masters;
CREATE TABLE masters (
    master_code TEXT,
    master_name_sv TEXT,
    master_name_en TEXT,
    PRIMARY KEY (master_code)
);

PRAGMA foreign_keys = ON;
