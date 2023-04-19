PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_period;
CREATE TABLE course_period (
    course_code TEXT,
    class TEXT,
    period_start INTEGER,
    period_end INTEGER,
    PRIMARY KEY (course_code, class, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses_info(course_code)
);
