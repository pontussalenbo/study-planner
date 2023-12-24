-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS study_plan;
CREATE TABLE study_plan(
    study_plan_id TEXT DEFAULT (LOWER(HEX(randomblob(16)))),
    study_plan_read_only_id TEXT DEFAULT (LOWER(HEX(randomblob(16)))),
    study_plan_name TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    year TEXT NOT NULL,
    PRIMARY KEY(study_plan_id),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code)
);

PRAGMA foreign_keys = ON;
