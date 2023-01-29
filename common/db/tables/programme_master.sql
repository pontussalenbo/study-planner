PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_master;
CREATE TABLE programme_master (
    programme_code TEXT REFERENCES programmes(programme_code),
    master_code TEXT REFERENCES masters(master_code)
);

CREATE UNIQUE INDEX idx_programme_master ON programme_master(programme_code, master_code);
