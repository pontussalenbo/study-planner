PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_masters;
CREATE TABLE programme_masters (
    programme_code TEXT REFERENCES programmes(programme_code),
    master_code TEXT REFERENCES masters(master_code)
);

CREATE UNIQUE INDEX idx_programme_masters ON programme_masters(programme_code, master_code);
