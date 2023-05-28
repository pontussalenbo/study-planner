PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_period_year;
CREATE TABLE course_period_year(
    course_code TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (course_code, academic_year, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (academic_year) REFERENCES programme_master_course_year (academic_year)
);
