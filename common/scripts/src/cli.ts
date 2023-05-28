import inquirer from 'inquirer';
import { DB_TABLES } from './utils/constants';
import { generateSQLData } from './parse';

const generalQuestions = [
    {
        type: 'checkbox',
        name: 'db',
        message: 'Which Databases would you like to update?',
        choices: DB_TABLES,
    },
];

console.time('Generating insert statements took');
// Self invoking async function, i.e run this function immediately
// when the script is run
(async () => {
    const { db } = await inquirer.prompt(generalQuestions);
    db.forEach((tableName: string) => {
        generateSQLData(tableName);
    })
    console.timeEnd('Generating insert statements took');
})();

