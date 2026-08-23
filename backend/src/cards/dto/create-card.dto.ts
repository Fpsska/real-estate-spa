export class CreateCardDto {
    id: string;
    equipment: string;
    suggestions: string;
    image: string;
    complexName: string;
    subwayName: string;
    walkTime: string;
    wayMoving: string;
    isActive: boolean;
    selectTemplates: SelectTemplateDto[];
}

class SelectTemplateDto {
    id: number;
    ploteName: string;
    housingNumber: string;
    quartalNumber: string;
    prices: PriceTemplateDto[];
}

class PriceTemplateDto {
    id: number;
    value: number;
}
