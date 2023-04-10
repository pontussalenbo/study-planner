PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS master_course;
CREATE TABLE master_course (
    course_code TEXT,
    master_code TEXT,
    PRIMARY KEY (course_code, master_code),
    FOREIGN KEY (course_code) REFERENCES courses_info(course_code),
    FOREIGN KEY (master_code) REFERENCES masters(master_code)
);

CREATE UNIQUE INDEX idx_master_course ON master_course(course_code, master_code);