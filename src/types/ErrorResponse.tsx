// types/ErrorResponse.ts
export interface ApiErrorResponse {
    success: false;
    response: null;
    error: {
        errorCode: string;
        message: string;
        status: number;
        timestamp: string;
    };
}
