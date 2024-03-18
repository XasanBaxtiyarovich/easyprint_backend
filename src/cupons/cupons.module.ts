import { Module } from '@nestjs/common';
import { CuponsService } from './cupons.service';
import { CuponsController } from './cupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cupon } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Cupon
      ]
    )
  ],
  controllers: [CuponsController],
  providers: [CuponsService],
})
export class CuponsModule {}
