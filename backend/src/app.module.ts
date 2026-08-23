import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardTemplatesModule } from './card-templates/card-templates.module';
import { CardsModule } from './cards/cards.module';

@Module({
    imports: [CardTemplatesModule, CardsModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
