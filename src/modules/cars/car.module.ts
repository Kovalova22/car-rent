import { Module } from '@nestjs/common';
import { CarsController } from './car.controller';
import { CarsService } from './car.service';

@Module({
  controllers: [CarsController],
  providers: [CarsService],
  exports: [CarsService],
})
export class CarsModule {}
