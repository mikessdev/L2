import { Injectable } from '@nestjs/common';
import { OrderDto, ProdutoDto } from './dto/order.dto';
import { CaixaDto, OrderPackedDto } from './dto/order-packed.dto';
import { Box, BoxRepository, Dimensoes } from './box.repository';

@Injectable()
export class BoxService {
  constructor(private readonly boxRepository: BoxRepository) {}

  packOrders(orders: OrderDto[]): OrderPackedDto[] {
    const packedOrders: OrderPackedDto[] = [];

    for (const { pedido_id, produtos } of orders) {
      packedOrders.push({ pedido_id, caixas: this.boxAllocator(produtos) });
    }

    return packedOrders;
  }

  private boxAllocator(produtos: ProdutoDto[]): CaixaDto[] {
    const availableBoxes: Box[] = this.boxRepository.getBoxes();
    const boxes: CaixaDto[] = [];

    const productOrderedBySize = produtos.sort((a, b) => {
      return this.calVolume(a.dimensoes) > this.calVolume(b.dimensoes) ? -1 : 1;
    });

    //for availableBoxes
    // verificar se produto cabe na caixa
    // se sim, colocar produto na caixa
    // verificar se cabe outro produto na caixa
    // se sim, colocar produto na caixa
    // se não,
    // se nao, pular para a proxima caixa

    for (const product of productOrderedBySize) {
      console.log('🚀 Processando produto: ', product.produto_id);

      // colocar produto em uma caixa

      // if (this.productIsBiggerThanAllAvailableBoxes(product.dimensoes)) {
      //   boxes.push({
      //     caixa_id: null,
      //     produtos: [product.produto_id],
      //     observacao: 'Produto não cabe em nenhuma caixa disponível.',
      //   });
      // }

      for (const box of availableBoxes) {
        const boxVolume = this.calVolume(box.dimensoes);
        const productVolume = this.calVolume(product.dimensoes);
        let availableSpaceInBox = box.dimensoes;

        if (boxVolume < productVolume) {
          boxes.push({
            caixa_id: box.box_id,
            produtos: [product.produto_id],
            observacao: 'Produto não cabe em nenhuma caixa disponível.',
          });
          break;
        }

        if (boxVolume >= productVolume) {
          boxes.push({
            caixa_id: box.box_id,
            produtos: [product.produto_id],
          });
          break;
        }
      }
    }

    return boxes;
  }

  private calVolume(dimensoes: Dimensoes): number {
    return dimensoes.comprimento * dimensoes.largura * dimensoes.altura;
  }

  private hasSpaceInBox(
    boxDimensoes: Dimensoes,
    productDimensoes: Dimensoes,
  ): boolean {
    const boxNumbers: number[] = [
      boxDimensoes.comprimento,
      boxDimensoes.largura,
      boxDimensoes.altura,
    ].sort((a, b) => b - a);
    const productNumbers: number[] = [
      productDimensoes.comprimento,
      productDimensoes.largura,
      productDimensoes.altura,
    ].sort((a, b) => b - a);

    return boxNumbers[0] > productNumbers[0];
  }

  private productIsBiggerThanAllAvailableBoxes(
    productDimensoes: Dimensoes,
  ): boolean {
    const boxes: Box[] = this.boxRepository.getBoxes();
    const allProductValues = [
      productDimensoes.altura,
      productDimensoes.largura,
      productDimensoes.comprimento,
    ];
    const allBoxesValues = boxes.reduce((acc: number[], box) => {
      acc.push(box.dimensoes.altura);
      acc.push(box.dimensoes.largura);
      acc.push(box.dimensoes.comprimento);

      return acc;
    }, [] as number[]);

    const biggestBoxNumber = allBoxesValues.sort((a, b) => b - a)[0];
    const biggestProductNumber = allProductValues.sort((a, b) => b - a)[0];

    return biggestProductNumber > biggestBoxNumber;
  }
}
