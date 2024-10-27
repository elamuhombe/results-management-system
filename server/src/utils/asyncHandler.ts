// src/utils/asyncHandler.ts

import { Request, Response, NextFunction } from 'express';

const asyncHandler =
    (fn: (req: Request, res: Response, next: NextFunction) => Promise<void |Response>) =>
    (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };

export default asyncHandler;