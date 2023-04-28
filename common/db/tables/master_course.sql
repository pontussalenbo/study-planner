PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_master;
CREATE TABLE course_master (
    course_code TEXT,
    master_code TEXT,
    PRIMARY KEY (course_code, master_code),
    FOREIGN KEY (course_code) REFERENCES courses(course_code),
    FOREIGN KEY (master_code) REFERENCES masters(master_code)
);
