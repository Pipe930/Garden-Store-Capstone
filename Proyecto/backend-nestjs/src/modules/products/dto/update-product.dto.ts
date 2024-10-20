import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export class UpdateProductDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    readonly title: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(100)
    readonly price: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    readonly brand: string;

    @IsBoolean()
    @IsNotEmpty()
    readonly published: boolean;

    @IsString()
    @IsNotEmpty()
    readonly returnPolicy: string;

    @IsString()
    @IsOptional()
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    readonly idCategory: number;

    @IsNumber()
    @IsOptional()
    readonly idOffer: number;
}
