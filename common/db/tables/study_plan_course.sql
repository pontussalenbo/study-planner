PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS study_plan_course;
CREATE TABLE study_plan_course(
    study_plan_id TEXT,
    course_code TEXT,
    PRIMARY KEY (study_plan_id, course_code),
    FOREIGN KEY (study_plan_id) REFERENCES study_plan(study_plan_id),
    FOREIGN KEY (course_code) REFERENCES courses(course_code)
);
