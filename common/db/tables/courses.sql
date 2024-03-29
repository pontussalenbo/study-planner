-- Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS courses;
CREATE TABLE courses (
    course_code TEXT,
    course_name_sv TEXT,
    course_name_en TEXT,
    credits DOUBLE,
    level VARCHAR(2) NOT NULL,
    PRIMARY KEY (course_code)
);

PRAGMA foreign_keys = ON;
