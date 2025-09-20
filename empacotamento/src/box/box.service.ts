import { Injectable } from '@nestjs/common';
import { OrderDto } from './dto/order.dto';
import { OrderPackedDto } from './dto/order-packed.dto';
import { BoxRepository } from './box.repository';

@Injectable()
export class BoxService {
  constructor(private readonly boxRepository: BoxRepository) {}

  embalarPedidos(orders: OrderDto[]): OrderPackedDto[] {
    const caixasDisponiveis = this.boxRepository.getBoxes();
    const orderPacked: OrderPackedDto[] = [];

    for (const { pedido_id, produtos } of orders) {
      const embalagens: OrderPackedDto = {
        pedido_id,
        caixas: [],
      };

      const disposicaoDeProdutosPorCaixas: any[] = [];
      for (const caixa of caixasDisponiveis) {
        disposicaoDeProdutosPorCaixas.push(
          this.embalarProduto(caixa, produtos),
        );
        // embalagens.caixas.push(this.embalarProduto(caixa, produtos));
        // break;
      }

      console.log(disposicaoDeProdutosPorCaixas);

      orderPacked.push(embalagens);
    }

    return orderPacked;
  }

  embalarProduto(caixa, produtos) {
    // função ainda não preve rotação de produtos
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
        continue;
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
      return { caixa_id: caixa.caixa_id, produtos: produtoAdicionado };
    }

    return {
      caixa_id: null,
      produtos: produtosNaoAdicionados,
      observacao: 'Produto não cabe em nenhuma caixa disponível.',
    };
  }
}
