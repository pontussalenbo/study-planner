-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_period_class;
CREATE TABLE course_period_class(
    course_code TEXT NOT NULL,
    class_year TEXT NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (course_code, class_year, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (class_year) REFERENCES programme_master_course_class (class_year)
);
