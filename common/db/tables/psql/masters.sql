BEGIN;

SET CONSTRAINTS ALL DEFERRED;

DROP TABLE IF EXISTS masters;

CREATE TABLE masters (
    master_code TEXT,
    master_name_sv TEXT,
    master_name_en TEXT,
    PRIMARY KEY (master_code)
);

COMMIT;