import {
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  Min,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderDto {
  @IsNumber()
  @IsNotEmpty()
  pedido_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProdutoDto)
  produtos: ProdutoDto[];
}

export class ProdutoDto {
  @IsString()
  @IsNotEmpty()
  produto_id: string;

  @ValidateNested()
  @Type(() => DimensoesDto)
  dimensoes: DimensoesDto;
}

export class DimensoesDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  altura: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  largura: number;

  @IsNumber()
  @IsNotEmpty()
  comprimento: number;
}
