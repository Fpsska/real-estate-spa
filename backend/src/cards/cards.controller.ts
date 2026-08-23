import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Patch,
    Delete
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('cards')
export class CardsController {
    constructor(private readonly cardsService: CardsService) {}

    @Get()
    getAll() {
        return this.cardsService.getAll();
    }

    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.cardsService.getById(id);
    }

    @Post()
    create(@Body() dto: CreateCardDto) {
        return this.cardsService.create(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateCardDto) {
        return this.cardsService.update(id, dto);
    }

    @Patch(':id')
    patch(@Param('id') id: string, @Body() dto: Partial<UpdateCardDto>) {
        return this.cardsService.patch(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.cardsService.delete(id);
    }
}
