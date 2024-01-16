import { Endpoints } from 'api/constants';
import { Filters } from 'interfaces/Types';
import { GET, POST } from 'utils/fetch';

export interface SavePlanResponse {
    studyPlanId: string;
    studyPlanReadOnlyId: string;
}

export interface PlanCourse {
    courseCode: string;
    period: API.Period;
    studyYear: CourseData.YEAR;
}

export interface StudyPlan {
    studyPlanName: string;
    programme: string;
    year: number | string;
    selectedCourses: PlanCourse[];
    studyPlanId?: string;
    customCourses?: PlanCourse[];
}
export interface StudyPlanCourse {
    courseCode: string;
    period: API.Period;
    studyYear: CourseData.YEAR;
}

export interface StudyPlanResponse extends Filters {
    isReadOnly: boolean;
    studyPlanName: string;
    selectedCourses: StudyPlanCourse[];
    customCourses?: CourseData.SelectedCourse[];
}

const emptyPlan: StudyPlanResponse = {
    studyPlanName: '',
    programme: '',
    year: '',
    isReadOnly: false,
    selectedCourses: []
};

export async function getPlan(
    planId: string,
    controller?: AbortController
): Promise<StudyPlanResponse> {
    const plan = GET<StudyPlanResponse>(
        Endpoints.savePlan,
        new URLSearchParams({ StudyPlanId: planId }),
        controller
    );

    return plan || emptyPlan;
}

export async function savePlan(plan: StudyPlan): Promise<SavePlanResponse> {
    return POST<SavePlanResponse>(Endpoints.savePlan, plan);
}
