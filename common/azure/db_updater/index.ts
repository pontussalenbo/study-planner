import { AzureFunction, Context } from '@azure/functions';
import { writeFile } from 'fs/promises';
import { generateSQLDataAllTables, main as getCourses } from 'scripts';

const log = (message: string, scope: string = 'default') => {
	const timeStamp = new Date().toISOString();
	writeFile('log.txt', `[${timeStamp}](${scope}): ${message}\n`, {
		flag: 'a',
	});
};

const timerTrigger: AzureFunction = async function (
	context: Context,
	myTimer: any
): Promise<void> {
	if (myTimer.isPastDue) {
		log('Timer function is running late!');
	}
	log('Timer trigger function ran!');

	await getCourses().catch((err: string) => {
		console.error(err);
		log(err, 'getCourses');
	});

	try {
		generateSQLDataAllTables();
	} catch (err) {
		console.error(err);
		log(err, 'generateSQLDataAllTables');
	}
};

export default timerTrigger;
