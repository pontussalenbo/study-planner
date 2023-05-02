PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_year;
CREATE TABLE course_year(
    programme_code TEXT,
    course_code TEXT,
    academic_year TEXT,
    PRIMARY KEY (programme_code, course_code, academic_year),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code),
    FOREIGN KEY (course_code) REFERENCES courses(course_code)
);
