/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Endpoints } from 'api/constants';

import { GET } from './fetch';

export function saveMaster() {
    return null;
}

export async function loadMaster() {
    const params = new URLSearchParams({ StudyPlanId: '7c3a8bea72e9146ee549e69759c526d8' });
    return GET(Endpoints.savePlan, params);
}
