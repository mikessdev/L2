import {
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DimensoesDto {
  @ApiProperty({
    description: 'Altura do produto em cm',
    example: 40,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  altura: number;

  @ApiProperty({
    description: 'Largura do produto em cm',
    example: 10,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  largura: number;

  @ApiProperty({
    description: 'Comprimento do produto em cm',
    example: 25,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  comprimento: number;
}

export class ProdutoDto {
  @ApiProperty({
    description: 'ID único do produto',
    example: 'PS5',
  })
  @IsString()
  @IsNotEmpty()
  produto_id: string;

  @ApiProperty({
    description: 'Dimensões do produto',
    type: DimensoesDto,
  })
  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes: DimensoesDto;
}

export class OrderDto {
  @ApiProperty({
    description: 'ID único do pedido',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  pedido_id: number;

  @ApiProperty({
    description: 'Lista de produtos do pedido',
    type: [ProdutoDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}
