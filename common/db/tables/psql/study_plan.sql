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