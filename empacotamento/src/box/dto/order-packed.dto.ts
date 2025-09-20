import {
  IsNumber,
  IsArray,
  IsString,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CaixaDto {
  @ApiProperty({
    description: 'ID da caixa (null se não couber em nenhuma caixa)',
    example: 'Caixa 1',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  caixa_id: string | null;

  @ApiProperty({
    description: 'Lista de IDs dos produtos na caixa',
    example: ['PS5', 'Volante'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  produtos: string[];

  @ApiProperty({
    description: 'Observação sobre o empacotamento',
    example: 'Produto não cabe em nenhuma caixa disponível.',
    required: false,
  })
  @IsString()
  @IsOptional()
  observacao?: string;
}

export class OrderPackedDto {
  @ApiProperty({
    description: 'ID único do pedido',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  pedido_id: number;

  @ApiProperty({
    description: 'Lista de caixas com produtos empacotados',
    type: [CaixaDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CaixaDto)
  caixas: CaixaDto[];
}
