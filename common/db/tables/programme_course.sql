PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_course;
CREATE TABLE programme_course (
    course_code TEXT REFERENCES courses_info(course_code),
    programme_code TEXT REFERENCES programmes(programme_code)
);

CREATE UNIQUE INDEX idx_programme_course ON programme_course(course_code, programme_code);

