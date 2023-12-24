-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_master_course_year;
CREATE TABLE programme_master_course_year(
    course_code TEXT NOT NULL,
    master_code TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    electability TEXT NOT NULL,
    PRIMARY KEY (course_code, master_code, programme_code, academic_year),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (master_code) REFERENCES masters (master_code),
    FOREIGN KEY (programme_code) REFERENCES programmes (programme_code)
);

PRAGMA foreign_keys = ON;
