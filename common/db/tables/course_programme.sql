PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_programme;
CREATE TABLE course_programme (
    course_code TEXT,
    programme_code TEXT,
    PRIMARY KEY (course_code, programme_code),
    FOREIGN KEY (course_code) REFERENCES courses(course_code),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code)
);
