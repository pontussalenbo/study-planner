BEGIN;

SET CONSTRAINTS ALL DEFERRED;

DROP TABLE IF EXISTS courses;

CREATE TABLE courses (
    course_code TEXT,
    course_name_sv TEXT,
    course_name_en TEXT,
    credits DOUBLE PRECISION,
    level VARCHAR(2) NOT NULL,
    PRIMARY KEY (course_code)
);

COMMIT;