PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS course_class;
CREATE TABLE course_class (
    programme_code TEXT REFERENCES programmes(programme_code),
    course_code TEXT REFERENCES courses_info(course_code),
    class TEXT,
);

CREATE UNIQUE INDEX idx_course_class ON course_class(programme_code, course_code, class);