import { Injectable } from '@nestjs/common';

@Injectable()
export class BoxRepository {
  getBoxes(): object[] {
    return [
      {
        box_id: '1',
        dimensoes: {
          altura: 30,
          largura: 40,
          comprimento: 80,
        },
      },
      {
        box_id: '2',
        dimensoes: {
          altura: 50,
          largura: 50,
          comprimento: 40,
        },
      },
      {
        box_id: '3',
        dimensoes: {
          altura: 50,
          largura: 80,
          comprimento: 60,
        },
      },
    ];
  }
}
