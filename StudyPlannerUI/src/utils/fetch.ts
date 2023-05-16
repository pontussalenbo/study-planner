import { BASE_URL } from './URL';

export async function POST(endpoint: string, data: unknown) {
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

export async function GET(endpoint: string, params: URLSearchParams) {
    try {
        const response = await fetch(BASE_URL + endpoint + '?' + params.toString());
        const json = await response.json();
        return json;
    } catch (error) {
        throw error as APIError;
    }
}

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
