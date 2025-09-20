import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderPackedDto } from './dto/order-packed.dto';
import { BoxRepository } from './box.repository';

@Injectable()
export class BoxService {
  constructor(private readonly boxRepository: BoxRepository) {}

  embalarPedidos(orders: OrderDto[]): OrderPackedDto[] {
    const caixas = this.boxRepository.getBoxes();
    const orderPacked: OrderPackedDto[] = [];

    for (const { pedido_id, produtos } of orders) {
      for (const caixa of caixas) {
        const embalagem = this.embalarProduto(caixa, produtos);

        orderPacked.push({
          pedido_id,
          ...embalagem,
        });

        break;
      }
    }

    return orderPacked;
  }

  embalarProduto(caixa, produtos) {
    // função ainda não preve rotação
    let espacoLivreNaCaixa = {
      z: caixa.dimensoes.comprimento,
      y: caixa.dimensoes.altura,
      x: caixa.dimensoes.largura,
    };

    const produtoAdicionado: string[] = [];
    const produtosNaoAdicionados: string[] = [];

    for (const produto of produtos) {
      const cabeNaCaixa =
        produto.dimensoes.largura <= espacoLivreNaCaixa.x &&
        produto.dimensoes.altura <= espacoLivreNaCaixa.y &&
        produto.dimensoes.comprimento <= espacoLivreNaCaixa.z;

      if (!cabeNaCaixa) {
        produtosNaoAdicionados.push(produto.produto_id);
        // console.log('produto: ' + produto.produto_id + ' não cabe na caixa');
        break;
      }

      produtoAdicionado.push(produto.produto_id);

      espacoLivreNaCaixa = {
        z: caixa.dimensoes.comprimento - produto.dimensoes.comprimento,
        y: caixa.dimensoes.altura - produto.dimensoes.altura,
        x: caixa.dimensoes.largura - produto.dimensoes.largura,
      };

      // console.log('produto: ' + produto.produto_id + ' adicionado na caixa');
    }

    if (produtoAdicionado.length) {
      return {
        caixas: [{ caixa_id: caixa.caixa_id, produtos: produtoAdicionado }],
      };
    }

    return {
      caixas: [{ caixa_id: null, produtos: produtosNaoAdicionados }],
    };
  }
}
