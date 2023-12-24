/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023
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

export async function savePlan(plan: StudyPlan): Promise<SavePlanResponse> {
    return POST<SavePlanResponse>(Endpoints.savePlan, plan);
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
