PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_courses;
CREATE TABLE programme_courses (
    course_code TEXT,
    programme_code TEXT,
    FOREIGN KEY (course_code, programme_code)
);
