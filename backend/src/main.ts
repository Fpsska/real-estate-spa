import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: 'Content-Type, Accept'
    });
    app.useGlobalPipes(new ValidationPipe());

    const PORT = process.env.PORT ?? 8080;

    await app.listen(PORT, () => {
        console.log(`Backend started on port ${PORT}`);
    });
}

bootstrap();
