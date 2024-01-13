-- Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

CREATE TABLE study_plan_course(
    study_plan_id TEXT,
    course_code TEXT,
    study_year INTEGER NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (study_plan_id, course_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(study_plan_id)
);
