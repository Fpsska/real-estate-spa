import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsArray,
    IsEnum,
    Length
} from 'class-validator';

export enum MovingType {
    WALK = 'walk',
    CAR = 'car'
}

export enum SubwayType {
    BEGOVAYA = 'Begovaya',
    MOSKOVSKAYA = 'Moskovskaya',
    PIONERSKAYA = 'Pionerskaya'
}

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 10)
    id: string;

    @IsString()
    @IsOptional()
    equipment: string;

    @IsNumber()
    @IsPositive()
    suggestions: number;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    complexName: string;

    @IsEnum(SubwayType)
    @IsNotEmpty()
    subwayName: string;

    walkTime: WalkTimeDto;

    @IsEnum(MovingType)
    @IsNotEmpty()
    wayMoving: string;

    @IsArray()
    selectTemplates: SelectTemplateDto[];
}

class WalkTimeDto {
    @IsString()
    @IsNotEmpty()
    unit: string;

    @IsNumber()
    @IsPositive()
    value: number;
}

class SelectTemplateDto {
    @IsNumber()
    @IsPositive()
    ploteName: number;

    @IsNumber()
    @IsPositive()
    housingNumber: number;

    @IsString()
    @IsNotEmpty()
    @Length(2, 10)
    quartalNumber: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsPositive({ each: true })
    prices: number[];
}
