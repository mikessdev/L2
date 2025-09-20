import { Injectable } from '@nestjs/common';

export interface Box {
  caixa_id: string;
  dimensoes: Dimensoes;
}

export interface Dimensoes {
  altura: number;
  largura: number;
  comprimento: number;
}
@Injectable()
export class BoxRepository {
  getBoxes(): Box[] {
    return [
      {
        caixa_id: 'Caixa 1',
        dimensoes: {
          altura: 30,
          largura: 40,
          comprimento: 80,
        },
      },
      {
        caixa_id: 'Caixa 2',
        dimensoes: {
          altura: 50,
          largura: 50,
          comprimento: 40,
        },
      },
      {
        caixa_id: 'Caixa 3',
        dimensoes: {
          altura: 50,
          largura: 80,
          comprimento: 60,
        },
      },
    ];
  }
}
