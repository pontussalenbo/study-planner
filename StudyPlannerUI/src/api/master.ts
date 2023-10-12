import { Endpoints } from 'api/constants';
import { GET, POST } from 'utils/fetch';

export interface MasterStatsBody {
    selectedCourses: string[];
    Programme: string;
    Year: string;
}

export function getMasterStats(body: MasterStatsBody, signal?: AbortController) {
    return POST<API.MasterStatus[]>(Endpoints.masterCheck, body, signal);
}

type Params = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export function getMasters(params: Params, signal?: AbortController) {
    return GET<API.Master[]>(Endpoints.masters, new URLSearchParams(params), signal);
}
