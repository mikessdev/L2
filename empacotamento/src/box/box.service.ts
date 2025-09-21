import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderPackedDto } from './dto/order-packed.dto';
import { BoxRepository } from './box.repository';
import {
  BinPackingService,
  BP3DBin,
} from 'src/bin-packing/bin-packing.service';
import { setDefaultResultOrder } from 'dns';

@Injectable()
export class BoxService {
  constructor(
    private readonly boxRepository: BoxRepository,
    private readonly binPackingService: BinPackingService,
  ) {}

  packOrders(orders: OrderDto[]): OrderPackedDto[] {
    return orders.map(({ pedido_id, produtos }) => {
      this.binPackingService.reset();

      this.addBoxesToPacker();
      this.addItemsToPacker(produtos);

      this.binPackingService.pack();

      return {
        pedido_id,
        caixas: this.formatPackingResult(),
      };
    });
  }

  private addBoxesToPacker(): void {
    const boxesFromRepository = this.boxRepository.getBoxes();

    boxesFromRepository.forEach(({ caixa_id, dimensoes }) => {
      const container = this.binPackingService.createContainer({
        id: caixa_id,
        ...dimensoes,
      });

      this.binPackingService.addContainer(container);
    });
  }

  private addItemsToPacker(produtos: OrderDto['produtos']): void {
    produtos.forEach(({ produto_id, dimensoes }) => {
      const packingItem = this.binPackingService.createItem({
        id: produto_id,
        ...dimensoes,
      });

      this.binPackingService.addItem(packingItem);
    });
  }

  private formatPackingResult() {
    const results = this.binPackingService.getResult().map((bin) => ({
      caixa_id: bin.name,
      produtos: bin.items.map((item) => item.name),
    }));

    return results.map((result) => {
      return result.produtos.length > 0
        ? result
        : {
            ...result,
            observacao: 'Produto não cabe em nenhuma caixa disponível.',
          };
    });
  }
}
