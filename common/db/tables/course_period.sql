DROP TABLE IF EXISTS course_period;
CREATE TABLE course_period (
    course_code TEXT,
    period_start INTEGER,
    period_end INTEGER,
    FOREIGN KEY (course_code)
);
