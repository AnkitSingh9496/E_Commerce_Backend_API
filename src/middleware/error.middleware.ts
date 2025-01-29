// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
    constructor(public statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (error instanceof ApiError) {
        res.status(error.statusCode).json({
            message: error.message
        });
        return;
    }

    res.status(500).json({
        message: 'Internal server error'
    });
};