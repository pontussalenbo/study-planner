DROP TABLE IF EXISTS programme_masters;
CREATE TABLE programme_masters (
    programme_code TEXT,
    master_code TEXT,
    FOREIGN KEY (programme_code, master_code)
);
