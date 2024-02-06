/*
 * Copyright Andreas Bartilson & Pontus Salenbo 2023-2024
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version. See the included LICENSE file for
 * the full text of the GNU General Public License.
 */

import { Filters } from 'interfaces/Types';

/* eslint-disable @typescript-eslint/no-explicit-any */

export type SelectedCourses = Record<CourseData.YEAR, CourseData.SelectedCourse[]>;

export const STUDYPLAN_STORAGE_KEY = 'studyplan';

/**
 * Information about the loaded plan.
 */
export interface LoadedPlan {
    /**
     * Whether the study plan is read only or not.
     */
    readOnly: boolean;
    /**
     * The name of the study plan.
     */
    name: string;
    /**
     * The URL used to access the study plan.
     */
    url: string;
}

/**
 * The urls (editable and readonly), used to access the study plan.
 */
export interface URLS {
    /**
     * The ID used to access the study plan in editable mode.
     */
    sId: string;
    /**
     * The ID used to access the study plan in read only mode.
     */
    sIdReadOnly: string;
}

export interface State {
    /**
     * The courses that are currently selected in the study plan.
     */
    selectedCourses: SelectedCourses;
    /**
     * Whether the study plan has been loaded or not from a saved plan.
     */
    loaded: boolean;
    /**
     * Information about the loaded plan.
     */
    loadedPlan: LoadedPlan;
    /**
     * Whether the study plan has unsaved changes or not.
     */
    unsavedChanges: boolean;
    /**
     * The urls (editable and readonly), used to access the study plan.
     */
    urls: URLS;
    /**
     * Custom courses that have been added to the study plan.
     */
    customCourses: SelectedCourses;
    filters: Filters;
}

/**
 * The action that is dispatched to update the state.
 * @template T The type of the payload.
 */
interface Action<T = any> {
    /**
     * Dispatchable action to perform.
     */
    type: keyof typeof actionHandlers;
    /**
     * Payload to update the state with.
     */
    payload: T;
}

/**
 * Sets the initial state when the component is mounted.
 * This is used when loading a study plan from a url to prepopulate the state.
 */
const setInitStateHandler = (state: State, action: Action<State>): State => ({
    ...state,
    ...action.payload,
    loaded: true
});

/**
 * Sets the courses that are currently selected in the study plan.
 */
const setSelectedCoursesHandler = (state: State, action: Action<SelectedCourses>): State => ({
    ...state,
    selectedCourses: action.payload,
    unsavedChanges: true
});

const setCustomCoursesHandler = (state: State, action: Action<SelectedCourses>): State => ({
    ...state,
    customCourses: action.payload,
    unsavedChanges: true
});

/**
 * Sets the urls (editable and readonly) for the study plan.
 */
const setUrlsHandler = (state: State, action: Action<URLS>): State => ({
    ...state,
    urls: action.payload
});

/**
 * Sets the loaded plan information.
 */
const setLoadedPlanHandler = (state: State, action: Action<LoadedPlan>): State => ({
    ...state,
    loadedPlan: action.payload
});

/**
 * Sets whether the study plan has unsaved changes or not.
 */
const setUnsavedChangesHandler = (state: State, action: Action<boolean>): State => {
    const unsavedChanges = action.payload;

    if (unsavedChanges) {
        localStorage.setItem(STUDYPLAN_STORAGE_KEY, JSON.stringify(state));
    } else {
        localStorage.removeItem(STUDYPLAN_STORAGE_KEY);
    }

    return {
        ...state,
        unsavedChanges: action.payload
    }

};

const setFiltersHandler = (state: State, action: Action<Filters>): State => ({
    ...state,
    filters: action.payload
});

// All actions that can be dispatched to update the state.
const actionHandlers = {
    SET_INIT_STATE: setInitStateHandler,
    SET_SELECTED_COURSES: setSelectedCoursesHandler,
    SET_CUSTOM_COURSES: setCustomCoursesHandler,
    SET_URLS: setUrlsHandler,
    SET_LOADED_PLAN: setLoadedPlanHandler,
    SET_UNSAVED_CHANGES: setUnsavedChangesHandler,
    SET_FILTERS: setFiltersHandler
};

export const reducer = (state: State, action: Action): State => {
    const handler = actionHandlers[action.type];
    if (!handler) {
        throw new Error(`No handler for action type ${action.type}`);
    }
    return handler(state, action);
};
