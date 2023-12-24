-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS study_plan_custom_course;
CREATE TABLE study_plan_custom_course(
    study_plan_id   TEXT,
    course_code     TEXT NOT NULL,
    course_name     TEXT NOT NULL,
    level           TEXT NOT NULL,
    credits         DOUBLE NOT NULL,
    study_year      INTEGER NOT NULL,
    period_start    INTEGER NOT NULL,
    period_end      INTEGER NOT NULL,
    PRIMARY KEY (study_plan_id, course_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(study_plan_id)
);

PRAGMA foreign_keys = ON;