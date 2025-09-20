import { Controller } from '@nestjs/common';

@Controller('box')
export class BoxController {
  packOrders(orders: Order[]): OrderPacked[] {}
}
