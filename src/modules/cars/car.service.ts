import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { differenceInDays, isWeekend } from 'date-fns';
import { db } from 'src/common/database';
import { CarRentPriceResponse, CreateSessionResponse } from './interfaces';
import { CreateSessionDto, GetRentPriceDto } from './interfaces/car.dto';

@Injectable()
export class CarsService {
  public async createSession(
    body: CreateSessionDto,
  ): Promise<CreateSessionResponse> {
    const { firstDay, lastDay, carId, rateId } = body;

    if (isWeekend(firstDay) || isWeekend(lastDay)) {
      throw new BadRequestException(
        'First and Last days of rent cannot be weekends!',
      );
    }

    const sessionsExist = await db.client
      .query(
        `
          SELECT * FROM cmn.sessions
        `,
      )
      .then((data) => data.rows);

    if (sessionsExist.length) {
      const lastCarSession = await db.client
        .query(
          `
            SELECT *
            FROM
            cmn.sessions
            WHERE car_id = '${carId}'
            ORDER BY last_day DESC`,
        )
        .then((data) => data.rows[0]);

      const today = new Date();
      const lastUsed = differenceInDays(today, lastCarSession.last_day);

      if (lastUsed < 3) {
        throw new BadRequestException(
          'You cannot rent the car which was used less than 3 days ago',
        );
      }
    }

    const days = differenceInDays(lastDay, firstDay);

    if (days <= 0) {
      throw new BadRequestException('Please provide valid time interval!');
    }

    if (days > 30) {
      throw new BadRequestException(
        'The longest rent period should not exceed 30 days!',
      );
    }

    const discount = await db.client
      .query(
        `
          SELECT * FROM cmn.discounts 
          WHERE min_day<=${days} AND max_day >= ${days}
        `,
      )
      .then((data) => data.rows[0]);

    const sessionToAdd = ['first_day', 'last_day', 'car_id', 'rate_id'];

    let sessionValuesToAdd = `'${firstDay.toUTCString()}', '${lastDay.toUTCString()}', '${carId}', '${rateId}'`;

    if (discount) {
      sessionToAdd.push('discount_id');

      sessionValuesToAdd += `, '${discount.id}'`;
    }

    const session = await db.client.query(
      `
        INSERT INTO cmn.sessions (${sessionToAdd.join(', ')})
        VALUES (${sessionValuesToAdd})
      `,
    );

    if (!session) {
      throw new BadRequestException('Unable to create a session!');
    }

    return { message: 'Car rent session successfully created!' };
  }

  public async getRentPrice(
    getRentPrice: GetRentPriceDto,
  ): Promise<CarRentPriceResponse> {
    const { firstDay, lastDay, rateId } = getRentPrice;

    if (isWeekend(firstDay) || isWeekend(lastDay)) {
      throw new BadRequestException(
        'First and Last days of rent cannot be weekends!',
      );
    }

    const days = differenceInDays(lastDay, firstDay);

    if (days > 30) {
      throw new BadRequestException(
        'The longest rent period should not exceed 30 days!',
      );
    }

    const rate = await db.client
      .query(
        `
          SELECT *
          FROM cmn.rates
          WHERE id = '${rateId}'
        `,
      )
      .then((data) => data.rows[0]);

    if (!rate) {
      throw new NotFoundException('There is no rate with such id!');
    }

    const price = days * rate.price;

    return { price };
  }
}
