import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderPackedDto } from './order-packed.dto';

export class EmpacotamentoOutputDto {
  @ApiProperty({
    description: 'Lista de pedidos empacotados',
    type: [OrderPackedDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderPackedDto)
  pedidos: OrderPackedDto[];
}
