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
