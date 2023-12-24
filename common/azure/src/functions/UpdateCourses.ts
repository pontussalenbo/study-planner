/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { app, InvocationContext, Timer } from '@azure/functions';
import axios from 'axios';
import * as df from 'durable-functions';
import { EntityContext, EntityHandler } from 'durable-functions';
import { main as getCourses } from "scripts/dist/getCourses";

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
    await getCourses(__dirname);

    await client.signalEntity(entityId, 'add', lastModified);
};

app.timer('UpdateCoursesHttpStart', {
    schedule: '0 0 2 * * *',
    extraInputs: [df.input.durableClient()],
    handler: TimerTrigger,
});
