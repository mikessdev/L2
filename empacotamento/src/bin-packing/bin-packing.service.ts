import { Injectable } from '@nestjs/common';
import * as BP3D from 'binpackingjs';

export interface PackingItem {
  id: string;
  altura: number;
  largura: number;
  comprimento: number;
  peso?: number;
}

export type BP3DItem = InstanceType<typeof BP3D.BP3D.Item>;
export type BP3DBin = InstanceType<typeof BP3D.BP3D.Bin>;
export type BP3DPacker = InstanceType<typeof BP3D.BP3D.Packer>;

@Injectable()
export class BinPackingService {
  private readonly bp3d = BP3D.BP3D;
  private packer: BP3DPacker;
  private readonly scale = 100000;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.packer = new this.bp3d.Packer();
  }

  createItem(product: PackingItem): BP3DItem {
    return new this.bp3d.Item(
      product.id,
      product.largura / this.scale,
      product.altura / this.scale,
      product.comprimento / this.scale,
      product.peso ?? 0,
    );
  }

  createContainer(box: PackingItem): BP3DBin {
    return new this.bp3d.Bin(
      box.id,
      box.largura / this.scale,
      box.altura / this.scale,
      box.comprimento / this.scale,
      Infinity,
    );
  }

  addItem(product: BP3DItem): void {
    this.packer.addItem(product);
  }

  addContainer(box: BP3DBin): void {
    this.packer.addBin(box);
  }

  pack(): void {
    this.packer.pack();
  }

  getResult(): BP3DBin[] {
    const fit = this.packer.bins.filter((bin) => bin.items.length > 0);
    const unfit = this.packer.unfitItems;

    const result = [
      ...fit.map((container) => {
        return {
          container_id: container.name,
          items: container.items.map((item) => item.name),
        };
      }),
    ];

    if (unfit.length > 0) {
      result.push({
        container_id: null,
        items: unfit.map((item) => item.name),
      });
    }

    return result;
  }
}
