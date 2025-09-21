import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoxModule } from './box/box.module';
import { BinPackingModule } from './bin-packing/bin-packing.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    BoxModule,
    BinPackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
