-- Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
--
-- This program is free software: you can redistribute it and/or modify
-- it under the terms of the GNU General Public License as published by
-- the Free Software Foundation, either version 3 of the License, or
-- (at your option) any later version. See the included LICENSE file for
-- the full text of the GNU General Public License.

BEGIN;

SET CONSTRAINTS ALL DEFERRED;

DROP TABLE IF EXISTS study_plan;

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE study_plan(
    study_plan_id TEXT DEFAULT (SUBSTRING(encode(gen_random_bytes(8), 'hex'), 1, 16)),
    study_plan_read_only_id TEXT DEFAULT (SUBSTRING(encode(gen_random_bytes(8), 'hex'), 1, 16)),
    study_plan_name TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    year TEXT NOT NULL,
    PRIMARY KEY(study_plan_id),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code)
);

COMMIT;