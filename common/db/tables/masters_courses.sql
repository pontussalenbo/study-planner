DROP TABLE IF EXISTS masters_courses;
CREATE TABLE masters_courses (
    course_code TEXT,
    master_code TEXT,
    FOREIGN KEY (course_code, master_code)
);
