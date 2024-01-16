import { Endpoints } from 'api/constants';
import { Filters } from 'interfaces/Types';
import { GET, POST } from 'utils/fetch';

export interface MasterStatsBody extends Filters {
    selectedCourses: string[];
}

export function getMasterStats(body: MasterStatsBody, signal?: AbortController) {
    return POST<API.MasterStatus[]>(Endpoints.masterCheck, body, signal);
}

type Params = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export function getMasters(params: Params, signal?: AbortController) {
    return GET<API.Master[]>(Endpoints.masters, new URLSearchParams(params), signal);
}
