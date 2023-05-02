const ftp = require('basic-ftp');
const { DB_FILE_NAME } = require('./utils/constants');
require('dotenv').config();

async function example() {
    const client = new ftp.Client();
    const { FTP_URL, FTP_USER, FTP_PASS } = process.env;
    const dbPath = `./db/${DB_FILE_NAME}`;
    const serverDir = '/site/wwwroot/Database';

    try {
        await client.access({
            host: FTP_URL,
            user: FTP_USER,
            password: FTP_PASS,
            secure: true
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
    }
    client.close();
}

example();
