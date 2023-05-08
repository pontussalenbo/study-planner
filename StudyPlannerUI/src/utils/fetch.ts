import { BASE_URL, COURSES_URL } from './URL';

export async function fetchData(data: unknown) {
    const body = JSON.stringify(data);
    const response = await fetch(BASE_URL + COURSES_URL, {
        body,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    return json;
}
