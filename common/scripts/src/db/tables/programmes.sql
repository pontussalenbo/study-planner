PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programmes;
CREATE TABLE programmes (
    programme_code TEXT,
    programme_name_sv TEXT,
    programme_name_en TEXT,
    PRIMARY KEY (programme_code)
);
