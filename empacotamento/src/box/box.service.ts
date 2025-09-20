import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderPackedDto } from './dto/order-packed.dto';

@Injectable()
export class BoxService {
  packOrders(orders: OrderDto[]): OrderPackedDto[] {
    console.log(orders);
    return [];
  }
}
