PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_course;
CREATE TABLE programme_course (
    course_code TEXT,
    programme_code TEXT,
    PRIMARY KEY (course_code, programme_code),
    FOREIGN KEY (course_code) REFERENCES courses_info(course_code),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code)
);

CREATE UNIQUE INDEX idx_programme_course ON programme_course(course_code, programme_code);

