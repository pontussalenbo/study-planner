import { Endpoints } from 'api/constants';
import { GET, POST } from 'utils/fetch';

export interface SavePlanResponse {
    StudyPlanId: string;
    StudyPlanReadOnlyId: string;
}

export interface PlanCourses {
    course_code: string;
    period_start: number;
    period_end: number;
    study_year: CourseData.YEAR;
}

export interface StudyPlan {
    StudyPlanName: string;
    Programme: string;
    Year: number | string;
    SelectedCourses: PlanCourses[];
    UniqueBlob?: string;
}

export async function savePlan(plan: StudyPlan): Promise<SavePlanResponse> {
    return POST<SavePlanResponse>(Endpoints.savePlan, plan);
}

export interface StudyPlanCourse {
    course_code: string;
    period_start: number;
    period_end: number;
    study_year: CourseData.YEAR;
}

export interface StudyPlanResponse {
    IsReadOnly: boolean;
    StudyPlanName: string;
    Programme: string;
    Year: string;
    SelectedCourses: StudyPlanCourse[];
}

const emptyPlan: StudyPlanResponse = {
    StudyPlanName: '',
    Programme: '',
    Year: '',
    IsReadOnly: false,
    SelectedCourses: []
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
