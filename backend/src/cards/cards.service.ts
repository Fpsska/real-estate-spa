import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
// import cardsMock from './mock/cards.mock.json';

@Injectable()
export class CardsService {
    private cards: CreateCardDto[] = [];

    getAll() {
        return this.cards;
    }

    getById(id: string) {
        const item = this.cards.find((card) => card.id === id);
        if (!item) throw new NotFoundException(`Card by ID:${id} is not exist`);

        return item;
    }

    create(dto: CreateCardDto) {
        this.cards.push(dto);

        return dto;
    }

    update(id: string, dto: CreateCardDto) {
        const index = this.cards.findIndex((card) => card.id === id);
        if (index === -1) {
            throw new NotFoundException(`Card by ID:${id} is not exist`);
        }

        this.cards[index] = { ...dto, id };

        return this.cards[index];
    }

    patch(id: string, dto: UpdateCardDto) {
        const item = this.getById(id);
        Object.assign(item, dto, { id });

        return item;
    }

    delete(id: string) {
        const item = this.getById(id);
        this.cards = this.cards.filter((card) => card.id !== id);

        return item;
    }
}
