import { Module } from '@nestjs/common';
import { BoxController } from './box.controller';
import { BoxService } from './box.service';
import { BoxRepository } from './box.repository';
import { BinPackingService } from 'src/bin-packing/bin-packing.service';

@Module({
  controllers: [BoxController],
  providers: [BoxService, BoxRepository, BinPackingService],
  imports: [],
})
export class BoxModule {}
