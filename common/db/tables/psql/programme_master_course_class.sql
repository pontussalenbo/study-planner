BEGIN;

SET CONSTRAINTS ALL DEFERRED;

DROP TABLE IF EXISTS programme_master_course_class;

CREATE TABLE programme_master_course_class(
    course_code TEXT NOT NULL,
    master_code TEXT NOT NULL,
    programme_code TEXT NOT NULL,
    class_year TEXT NOT NULL,
    electability TEXT NOT NULL,
    PRIMARY KEY (course_code, master_code, programme_code, class_year),
    FOREIGN KEY (course_code) REFERENCES courses (course_code),
    FOREIGN KEY (master_code) REFERENCES masters (master_code),
    FOREIGN KEY (programme_code) REFERENCES programmes (programme_code)
);

COMMIT;