-- Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

DROP TABLE IF EXISTS courses CASCADE;
CREATE TABLE courses (
    course_code TEXT,
    course_name_sv TEXT,
    course_name_en TEXT,
    credits REAL,
    level VARCHAR(2) NOT NULL,
    PRIMARY KEY (course_code)
);
DROP TABLE IF EXISTS masters CASCADE;
CREATE TABLE masters (
    master_code TEXT,
    master_name_sv TEXT,
    master_name_en TEXT,
    PRIMARY KEY (master_code)
);
DROP TABLE IF EXISTS programmes CASCADE;
CREATE TABLE programmes (
    programme_code TEXT,
    programme_name_sv TEXT,
    programme_name_en TEXT,
    PRIMARY KEY (programme_code)
);
DROP TABLE IF EXISTS programme_master_course_class CASCADE;
CREATE TABLE programme_master_course_class (
    course_code TEXT NOT NULL,
    master_code TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    class_year TEXT NOT NULL,
    electability TEXT NOT NULL,
    PRIMARY KEY (course_code, master_code, programme_code, class_year),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (master_code) REFERENCES masters (master_code),
    FOREIGN KEY (programme_code) REFERENCES programmes (programme_code)
);
DROP TABLE IF EXISTS programme_master_course_year CASCADE;
CREATE TABLE programme_master_course_year (
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
-- Drop and create course_period_class table
DROP TABLE IF EXISTS course_period_class CASCADE;
CREATE TABLE course_period_class (
    course_code TEXT NOT NULL,
    class_year TEXT NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (course_code, class_year, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses (course_code)
);
DROP TABLE IF EXISTS course_period_year CASCADE;
CREATE TABLE course_period_year (
    course_code TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (course_code, academic_year, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses (course_code)
);
DROP TABLE IF EXISTS study_plan CASCADE;
CREATE TABLE study_plan (
    id SERIAL,
    study_plan_id TEXT DEFAULT LOWER((gen_random_uuid())::text),
    study_plan_read_only_id TEXT DEFAULT LOWER((gen_random_uuid())::text),
    study_plan_name TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    year TEXT NOT NULL,
    PRIMARY KEY (study_plan_id),
    FOREIGN KEY (programme_code) REFERENCES programmes (programme_code)
);
DROP TABLE IF EXISTS study_plan_course CASCADE;
CREATE TABLE study_plan_course (
    study_plan_id TEXT,
    course_code TEXT,
    study_year INTEGER NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (study_plan_id, course_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan (study_plan_id)
);
DROP TABLE IF EXISTS study_plan_custom_course CASCADE;
CREATE TABLE study_plan_custom_course (
    study_plan_id   TEXT,
    course_code     TEXT NOT NULL,
    course_name     TEXT NOT NULL,
    level           TEXT NOT NULL,
    credits         DOUBLE PRECISION NOT NULL,
    study_year      INTEGER NOT NULL,
    period_start    INTEGER NOT NULL,
    period_end      INTEGER NOT NULL,
    PRIMARY KEY (study_plan_id, course_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan (study_plan_id)
);
