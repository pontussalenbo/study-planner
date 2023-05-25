import { app, InvocationContext, Timer } from '@azure/functions';
import axios from 'axios';
import * as df from 'durable-functions';
import { EntityContext, EntityHandler } from 'durable-functions';
import { main } from "shared-scripts";
const entityName = 'UpdateCourses';
const LAST_UPDATED_URL = "https://kurser.lth.se/lot/";

const UpdateCourses: EntityHandler<string> = (context: EntityContext<string>) => {
    const currentValue: string = context.df.getState(() => "");
    switch (context.df.operationName) {
        case 'add':
            const newVal = context.df.getInput();
            context.df.setState(newVal);
            break;
        case 'reset':
            context.df.setState("");
            break;
        case 'get':
            context.df.return(currentValue);
            break;
    }
};
df.app.entity(entityName, UpdateCourses);

const getLastModified = async () => {
    const { headers } = await axios.get(LAST_UPDATED_URL);
    const lastModified = headers['last-modified'];
    return lastModified;
}

export async function TimerTrigger(myTimer: Timer, context: InvocationContext): Promise<void> {
    const entityId = new df.EntityId(entityName, "KEKO");
    const client = df.getClient(context);

    const current = await client.readEntityState(entityId);
    const lastModified = await getLastModified();

    console.log("current state: " + current.entityState);
    if (current.entityState === lastModified) {
        console.log("Up to date, skipping...")
        return;
    }
    console.log("Updating...");
    await main(__dirname);

    await client.signalEntity(entityId, 'add', lastModified);
};

app.timer('UpdateCoursesHttpStart', {
    schedule: '0 0 2 * * *',
    extraInputs: [df.input.durableClient()],
    handler: TimerTrigger,
    runOnStartup: true
});
