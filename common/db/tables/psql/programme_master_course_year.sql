BEGIN;

SET CONSTRAINTS ALL DEFERRED;

DROP TABLE IF EXISTS programme_master_course_year;

CREATE TABLE programme_master_course_year(
    course_code TEXT NOT NULL,
    master_code TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    electability TEXT NOT NULL,
    PRIMARY KEY (course_code, master_code, programme_code, academic_year),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (master_code) REFERENCES masters (master_code),
    FOREIGN KEY (programme_code) REFERENCES programmes (programme_code)
);

COMMIT;