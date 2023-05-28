const shell = require('shelljs');

const outDir = './dist/src';

const res = shell.cp('-r', './src/db', outDir);

if (res.code !== 0) {
    shell.echo('Error: Copy db failed');
    shell.exit(1);
} else {
    shell.echo('Copied data sets successfully');
}
