PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_period;
CREATE TABLE course_period (
    course_code TEXT,
    class_year TEXT,
    academic_year TEXT,
    period_start INTEGER,
    period_end INTEGER,
    PRIMARY KEY (course_code, class_year, academic_year, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses(course_code)
);
