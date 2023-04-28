PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_class;
CREATE TABLE course_class (
    programme_code TEXT,
    course_code TEXT,
    class_year TEXT,
    PRIMARY KEY (programme_code, course_code),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code),
    FOREIGN KEY (course_code) REFERENCES courses(course_code)
);
