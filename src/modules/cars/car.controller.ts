import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { handleError } from 'src/common/errorHandler';
import { CarsService } from './car.service';
import { CarRentPriceResponse } from './interfaces';
import { CreateSessionDto, GetRentPriceDto } from './interfaces/car.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('session')
  async createSession(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: CreateSessionDto,
  ) {
    try {
      return await this.carsService.createSession(body);
    } catch (error) {
      handleError(error, 'createSession');
    }
  }

  @Get('price')
  async getRentPrice(
    @Query(new ValidationPipe({ transform: true, whitelist: true }))
    getRentPrice: GetRentPriceDto,
  ): Promise<CarRentPriceResponse> {
    try {
      return this.carsService.getRentPrice(getRentPrice);
    } catch (error) {
      handleError(error, 'getRentPrice');
    }
  }
}
