import { createApp } from './create-app';

async function bootstrap() {
    const app = await createApp();
    const PORT = process.env.PORT ?? 8080;

    await app.listen(PORT, () => {
        console.log(`Backend started on port ${PORT}`);
    });
}

bootstrap();
