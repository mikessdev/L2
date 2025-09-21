import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderPackedDto } from './dto/order-packed.dto';
import { BoxRepository } from './box.repository';
import * as BP3D from 'binpackingjs';

const { Item, Bin, Packer } = BP3D.BP3D;
const scale = 100000;

@Injectable()
export class BoxService {
  constructor(private readonly boxRepository: BoxRepository) {}

  embalarPedidos(orders: OrderDto[]): OrderPackedDto[] {
    const caixasDisponiveis = this.boxRepository.getBoxes();
    const caixasAposEmbalagem: any = [];
    const orderPacked: OrderPackedDto[] = [];

    for (const { pedido_id, produtos } of orders) {
      const caixasUsadas: any = [];
      const embalagem = new Packer();

      caixasDisponiveis.forEach(({ caixa_id, dimensoes }) => {
        const bin = new Bin(
          caixa_id,
          dimensoes.largura / scale,
          dimensoes.altura / scale,
          dimensoes.comprimento / scale,
          Infinity,
        );

        caixasUsadas.push(bin);
        embalagem.addBin(bin);
      });

      produtos.forEach(({ produto_id, dimensoes }) => {
        embalagem.addItem(
          new Item(
            produto_id,
            dimensoes.largura / scale,
            dimensoes.altura / scale,
            dimensoes.comprimento / scale,
            0,
          ),
        );
      });

      embalagem.pack();
      console.log(embalagem);
      caixasAposEmbalagem.push({
        pedido_id,
        ...caixasUsadas.filter((bin) => bin.items.length),
      });
    }

    // caixasAposEmbalagem.forEach((bin) => {
    //   console.log('pedido_id: ', bin.pedido_id);
    //   console.log(bin['0']?.name);
    //   console.log(bin['0']?.items);
    // });
    return orderPacked;
  }
}
