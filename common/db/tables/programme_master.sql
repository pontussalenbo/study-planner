PRAGMA foreign_keys = off;

DROP TABLE IF EXISTS programme_master;
CREATE TABLE programme_master (
    programme_code TEXT,
    master_code TEXT,
    PRIMARY KEY (programme_code, master_code),
    FOREIGN KEY (programme_code) REFERENCES programmes(programme_code),
    FOREIGN KEY (master_code) REFERENCES masters(master_code)
);

CREATE UNIQUE INDEX idx_programme_master ON programme_master(programme_code, master_code);
