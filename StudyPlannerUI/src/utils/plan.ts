import { Endpoints } from 'interfaces/API_Constants.d';
import { GET } from './fetch';

export function saveMaster() {
    return null;
}

export async function loadMaster() {
    const params = new URLSearchParams({ StudyPlanId: '7c3a8bea72e9146ee549e69759c526d8' });
    return GET(Endpoints.savePlan, params);
}
