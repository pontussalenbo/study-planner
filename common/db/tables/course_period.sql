PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_period;
CREATE TABLE course_period (
    course_code TEXT REFERENCES courses_info(course_code),
    period_start INTEGER,
    period_end INTEGER,
);


CREATE UNIQUE INDEX idx_course_period ON course_period(course_code, period_start, period_end);
