import {
  IsNumber,
  IsArray,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class OrderPackedDto {
  @IsNumber()
  @IsNotEmpty()
  pedido_id: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaixaDto)
  caixas: CaixaDto[];
}

export class CaixaDto {
  @IsString()
  @IsOptional()
  caixa_id: string | null;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  produtos: string[];

  @IsString()
  @IsOptional()
  observacao?: string;
}
