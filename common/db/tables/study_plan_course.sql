PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS study_plan_course;
CREATE TABLE study_plan_course(
    study_plan_id TEXT,
    course_code TEXT,
    study_year INTEGER NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (study_plan_id, course_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(study_plan_id)
);

PRAGMA foreign_keys = ON;
