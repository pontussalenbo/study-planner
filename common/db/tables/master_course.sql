PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS master_course;
CREATE TABLE master_course (
    course_code TEXT REFERENCES courses_info(course_code),
    master_code TEXT REFERENCES masters(master_code)
);

CREATE UNIQUE INDEX idx_master_course ON master_course(course_code, master_code);