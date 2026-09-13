import express, { type Request, type Response } from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';

import { createApp } from '../src/create-app';

const server = express();
let bootstrapPromise: Promise<void> | null = null;

async function bootstrap(): Promise<void> {
    const app = await createApp(new ExpressAdapter(server));
    await app.init();
}

export default async function handler(
    req: Request,
    res: Response
): Promise<void> {
    if (!bootstrapPromise) bootstrapPromise = bootstrap();
    await bootstrapPromise;
    server(req, res);
}
