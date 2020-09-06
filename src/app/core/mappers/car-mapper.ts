import { parseDate, dateToString } from 'src/app/shared/utils';

import { CarDto } from '../dtos';
import { Car } from '../models';

import { Mapper } from './mapper';

/**
 * Mapper for CarDto and Car.
 */
export class CarMapper implements Mapper<CarDto, Car> {
  /** @inheritdoc */
  public fromDto(dto: CarDto): Car {
    const car = new Car({
      id: dto.id,
      producer: dto.producer,
      model: dto.model,
      bodyType: Number(dto.bodyType),
      year: Number(dto.year),
      mileage: Number(dto.mileage),
      description: dto.description,
      created: parseDate(dto.created),
      updated: parseDate(dto.updated),
    });
    return car;
  }

  /** @inheritdoc */
  public toDto(domain: Car): CarDto {
    const dto: CarDto = {
      id: domain?.id,
      producer: domain?.producer,
      model: domain?.model,
      bodyType: domain?.bodyType.toString(),
      year: domain?.year.toString(),
      mileage: domain?.mileage.toString(),
      description: domain?.description,
      created: dateToString(domain.created),
      updated: dateToString(domain.updated),
    };
    return dto;
  }
}
