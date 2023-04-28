import {Request, Response } from 'express';

export function createPost(req: Request, res: Response): Promise<void>;
export function getPosts(req: Request, res: Response): Promise<void>;
export function getPostsById(req: Request, res: Response): Promise<void>;
export function followProject(req: Request, res: Response): Promise<void>;
export function updateProject(req: Request, res: Response): Promise<void>;
export function followingProjects(req: Request, res: Response): Promise<void>;
export function personalProjects(req: Request, res: Response): Promise<void>;
export function postComment(req: Request, res: Response): Promise<void>;