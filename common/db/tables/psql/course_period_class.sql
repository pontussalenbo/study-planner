BEGIN;

SET CONSTRAINTS ALL DEFERRED;

DROP TABLE IF EXISTS course_period_class;

CREATE TABLE course_period_class(
    course_code TEXT NOT NULL,
    class_year TEXT NOT NULL,
    period_start INTEGER NOT NULL,
    period_end INTEGER NOT NULL,
    PRIMARY KEY (course_code, class_year, period_start, period_end),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (class_year) REFERENCES programme_master_course_class (class_year)
);

COMMIT;