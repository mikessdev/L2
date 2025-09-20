import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDto } from './order.dto';

export class EmpacotamentoInputDto {
  @ApiProperty({
    description: 'Lista de pedidos para empacotar',
    type: [OrderDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDto)
  pedidos: OrderDto[];
}
