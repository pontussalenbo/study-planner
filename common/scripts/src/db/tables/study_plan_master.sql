-- Copyright Andreas Bartilson & Pontus Salenbo 2023
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS study_plan_master;
CREATE TABLE study_plan_master(
    study_plan_id TEXT,
    master_code TEXT,
    PRIMARY KEY(study_plan_id, master_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(study_plan_id),
    FOREIGN KEY (master_code) REFERENCES masters(master_code)
);
