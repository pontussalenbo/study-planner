const inquirer = require('inquirer');
const { DB_TABLES } = require('./utils/constants');
const { getKeyMapfromSQLTable, mapPropToType, genSqlStmt } = require('./genSqlDb');

const generalQuestions = [
    {
        type: 'checkbox',
        name: 'db',
        message: 'Which Databases would you like to update?',
        choices: DB_TABLES,
    },
];

// Self invoking async function, i.e run this function immediately
// when the script is run
(async () => {
    const { db } = await inquirer.prompt(generalQuestions);
    db.forEach(async (tableName) => {
        const keyMappings = await getKeyMapfromSQLTable(tableName);
        const mappings = await mapPropToType(tableName, keyMappings);
        genSqlStmt({ mappings, tableName });
    });
})();
