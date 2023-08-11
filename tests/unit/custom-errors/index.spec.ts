import {
    AppError,
    AuthenticationError,
    ValidationError,
    NotFoundError,
    DateValidationError,
    ServerInternalError,
} from "../../../src/services/utility/app-error"; // Import your error classes

describe('Custom Error Classes', () => {
    test('AuthenticationError should have correct properties', () => {
        const authError = new AuthenticationError('Authentication failed');
        expect(authError.statusCode).toBe(401);
        expect(authError.status).toBe('fail');
        expect(authError.isOperational).toBe(true);
        expect(authError.message).toBe('Authentication failed');
    });

    test('ValidationError should have correct properties', () => {
        const validationError = new ValidationError('Validation failed');
        expect(validationError.statusCode).toBe(400);
        expect(validationError.status).toBe('fail');
        expect(validationError.isOperational).toBe(true);
        expect(validationError.message).toBe('Validation failed');
    });

    test('NotFoundError should have correct properties', () => {
        const notFoundError = new NotFoundError('Resource not found');
        expect(notFoundError.statusCode).toBe(404);
        expect(notFoundError.status).toBe('fail');
        expect(notFoundError.isOperational).toBe(true);
        expect(notFoundError.message).toBe('Resource not found');
    });

    test('DateValidationError should have correct properties', () => {
        const dateValidationError = new DateValidationError('Invalid date');
        expect(dateValidationError.statusCode).toBe(400);
        expect(dateValidationError.status).toBe('fail');
        expect(dateValidationError.isOperational).toBe(true);
        expect(dateValidationError.message).toBe('Invalid date');
    });

    test('ServerInternalError should have correct properties', () => {
        const serverError = new ServerInternalError('Internal error occurred');
        expect(serverError.statusCode).toBe(500);
        expect(serverError.status).toBe('error');
        expect(serverError.isOperational).toBe(true);
        expect(serverError.message).toBe('Internal error occurred');
    });

    test('ServerInternalError should have correct properties', () => {
        const serverError = new ServerInternalError();
        expect(serverError.statusCode).toBe(500);
        expect(serverError.status).toBe('error');
        expect(serverError.isOperational).toBe(true);
        expect(serverError.message).toBe('An internal server error occurred');
    });

    test('AppError should be instance of Error', () => {
        const appError = new AppError('Generic error', 400);
        expect(appError instanceof Error).toBe(true);
    });
});