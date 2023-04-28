import { Request, Response } from 'express';

export function getUser(req: Request, res: Response): Promise<void>;
export function postUser(req: Request, res: Response): Promise<void>;