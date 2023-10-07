import { Endpoints } from 'interfaces/API_Constants.d';
import { POST } from 'utils/fetch';

export interface MasterStatsBody {
    selectedCourses: string[];
    Programme: string;
    Year: string;
}

export function getMasterStats(body: MasterStatsBody, signal?: AbortController) {
    return POST<API.MasterStatus[]>(Endpoints.masterCheck, body, signal);
}
