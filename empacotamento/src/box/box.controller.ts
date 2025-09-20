import { Controller, Post, Body } from '@nestjs/common';
import { BoxService } from './box.service';
import { OrderDto } from './dto/order.dto';
import { OrderPackedDto } from './dto/order-packed.dto';

@Controller('box')
export class BoxController {
  constructor(private readonly boxService: BoxService) {}

  @Post('pack')
  packOrders(@Body() input: OrderDto[]): OrderPackedDto[] {
    const orderPacked = this.boxService.packOrders(input);
    return orderPacked;
  }
}
