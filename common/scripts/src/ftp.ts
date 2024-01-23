/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import * as ftp from "basic-ftp"
import { DB_FILE_NAME } from './utils/constants';
require('dotenv').config();

export async function upload() {
    const client = new ftp.Client();
    client.ftp.ipFamily = 4;
    client.ftp.verbose = true
    const { FTP_URL, FTP_USER, FTP_PASS, FTP_DB_ROOT } = process.env;
    const dbPath = `./db/${DB_FILE_NAME}`;
    const serverDir = FTP_DB_ROOT!;

    console.log(FTP_URL, FTP_USER, FTP_PASS)

    try {
        await client.access({
            host: FTP_URL,
            user: FTP_USER,
            password: FTP_PASS,
            secure: true,
        });

        client.trackProgress((info) => {
            console.log('File', info.name);
            console.log('Type', info.type);
            console.log('Transferred', info.bytes);
            console.log('Transferred Overall', info.bytesOverall);
        });

        await client.ensureDir(serverDir);
        await client.uploadFrom(dbPath, DB_FILE_NAME);

        client.trackProgress((info) => console.log(info.bytesOverall));
        client.trackProgress();
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }
}

if (require.main === module) {
    upload();
}

export default upload;

