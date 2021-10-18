import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  firstDay: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  lastDay: Date;

  @IsUUID()
  @IsNotEmpty()
  carId: string;

  @IsUUID()
  @IsNotEmpty()
  rateId: string;
}

export class GetRentPriceDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  firstDay: Date;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  lastDay: Date;

  @IsUUID()
  @IsNotEmpty()
  rateId: string;
}
