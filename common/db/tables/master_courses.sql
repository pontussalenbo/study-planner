PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS master_courses;
CREATE TABLE master_courses (
    course_code TEXT REFERENCES courses_info(course_code),
    master_code TEXT REFERENCES masters(master_code)
);

CREATE UNIQUE INDEX idx_master_courses ON master_courses(course_code, master_code);