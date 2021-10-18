import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsModule } from './modules/cars/car.module';

@Module({
  imports: [ConfigModule.forRoot(), CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
