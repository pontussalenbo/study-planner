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
import { Filters } from 'interfaces/Types';
import { GET, POST } from 'utils/fetch';

export interface MasterStatsBody extends Filters {
    selectedCourses: string[];
}

export function getMasterStats(body: MasterStatsBody, signal?: AbortController) {
    return POST<API.MasterStatus[]>(Endpoints.masterCheck, body, signal);
}

export async function getMasters(params: Filters, signal?: AbortController) {
    if (!params.programme || !params.year) {
        return [];
    }
    return GET<API.Master[]>(Endpoints.masters, new URLSearchParams({ ...params }), signal);
}
