/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

const shell = require('shelljs');

const outDir = './dist/src';

const res = shell.cp('-r', './src/db', outDir);

if (res.code !== 0) {
    shell.echo('Error: Copy db failed');
    shell.exit(1);
} else {
    shell.echo('Copied data sets successfully');
}
