PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS study_plan_master;
CREATE TABLE study_plan_master(
    study_plan_id TEXT,
    master_code TEXT,
    PRIMARY KEY(study_plan_id, master_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(study_plan_id),
    FOREIGN KEY (master_code) REFERENCES masters(master_code)
);
