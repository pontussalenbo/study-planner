/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

const { spawn } = require('child_process');

const dockerCompose = spawn(
    'docker-compose',
    ['-f', 'docker-compose.yml', '-f', 'docker-compose-dev.yml', 'up', '--build'],
    {
        stdio: 'inherit', // This will show the colorized output
        shell: true
    }
);

dockerCompose.on('exit', (code, signal) => {
    console.log('child process exited with '
              + `code ${code} and signal ${signal}`);
});
