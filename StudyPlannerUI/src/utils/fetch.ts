import { BASE_URL } from './URL';

export async function POST<T = any>(endpoint: string, data: unknown): Promise<T> {
    const body = JSON.stringify(data);
    try {
        const response = await fetch(BASE_URL + endpoint, {
            body,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        });
        const json = await response.json();
        return json;
    } catch (error) {
        throw error as APIError;
    }
}

/**
 * Send a GET request to the specified endpoint and parse the response as JSON.
 *
 * @template T The expected return type of the API response.
 * @param {string} endpoint The endpoint to send the request to.
 * @param {URLSearchParams} [params] Optional search parameters to include in the request.
 *
 * @returns {Promise<T>} A promise that resolves to the JSON parsed response.
 *
 * @throws {APIError} If an error occurs during the fetch operation, it will throw an error of type APIError.
 */
export async function GET<T = any>(
    endpoint: string,
    params?: URLSearchParams
): Promise<T> {
    try {
        const url = new URL(BASE_URL + endpoint);

        if (params) {
            url.search = params.toString();
        }

        const response = await fetch(url.toString());
        const json = await response.json();
        return json;
    } catch (error) {
        throw error as APIError;
    }
}

/**
 * @interface IAPIError
 *
 * Represents an error returned from an API call. This interface encapsulates
 * information about the error to facilitate debugging and error handling.
 *
 * @property {string} message - A human-readable description of the error.
 *
 * @property {number} code - A numerical code representing the error.
 * This can be used to categorize errors or to programmatically respond
 * to specific types of errors.
 *
 * @property {Record<string, unknown>} rest - An object containing any
 * additional details about the error. The properties of this object can
 * vary depending on the specific error. This can be useful for including
 * any error-specific data that doesn't fit into the `message` or `code` properties.
 */
interface IAPIError {
  message: string;
  code: number;
  rest: Record<string, unknown>;
}
class APIError extends Error implements IAPIError {
    public readonly code;
    public readonly rest;
    constructor({ message, code, ...rest }: IAPIError) {
        super(message);
        this.name = 'APIError';
        this.code = code;
        this.rest = rest;
    }
}
