PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS courses_info;
CREATE TABLE courses_info (
    course_code TEXT,
    course_name_sv TEXT,
    course_name_en TEXT,
    credits DOUBLE,
    level VARCHAR(2) NOT NULL,
    PRIMARY KEY (course_code)
);
