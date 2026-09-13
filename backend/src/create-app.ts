import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
    ExpressAdapter,
    type NestExpressApplication
} from '@nestjs/platform-express';

import { AppModule } from './app.module';

export async function createApp(
    adapter?: ExpressAdapter
): Promise<NestExpressApplication> {
    const app = adapter
        ? await NestFactory.create<NestExpressApplication>(AppModule, adapter)
        : await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: 'Content-Type, Accept'
    });
    app.useGlobalPipes(new ValidationPipe());

    return app;
}
