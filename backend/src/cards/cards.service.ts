import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import cardsMock from './mock/cards.mock.json';

@Injectable()
export class CardsService {
    private cards: UpdateCardDto[] = cardsMock as UpdateCardDto[];

    getAll() {
        return this.cards;
    }

    getById(id: string) {
        const item = this.cards.find((card) => card.id === id);
        if (!item) throw new NotFoundException(`Card by ID:${id} is not exist`);

        return item;
    }

    create(dto: CreateCardDto) {
        const item = { ...dto, id: `${this.cards.length + 1}` };
        this.cards.push(item);

        return item;
    }

    update(id: string, dto: UpdateCardDto) {
        const index = this.cards.findIndex((card) => card.id === id);
        if (index === -1) {
            throw new NotFoundException(`Card by ID:${id} is not exist`);
        }

        this.cards[index] = { ...dto, id }; // TODO: ValidationPipe for dto

        return this.cards[index];
    }

    patch(id: string, dto: Partial<UpdateCardDto>) {
        const item = this.getById(id);
        Object.assign(item, dto, { id }); // TODO: ValidationPipe for dto

        return item;
    }

    delete(id: string) {
        const item = this.getById(id);
        this.cards = this.cards.filter((card) => card.id !== id);

        return item;
    }
}
