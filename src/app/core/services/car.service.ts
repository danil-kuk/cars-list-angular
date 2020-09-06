import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CarDto } from '../dtos';
import { CarMapper } from '../mappers';
import { Car } from '../models';

import { DatabaseService } from './database.service';

const CARS_COLLECTION_ID = 'cars';

/**
 * Service that manages car data.
 */
@Injectable({
  providedIn: 'root',
})
export class CarService {
  /** Mapper to work with Car and CarDto. */
  private readonly carMapper = new CarMapper();

  /**
   * Create car service to manage cars data.
   * @param databaseService Database service to use.
   */
  constructor(private databaseService: DatabaseService) {}

  /**
   * Get cars list.
   */
  public getCars(): Observable<Car[]> {
    return this.databaseService
      .getAllItems(CARS_COLLECTION_ID)
      .pipe(
        map((items: CarDto[]) =>
          items.map((dto) => this.carMapper.fromDto(dto)),
        ),
      );
  }

  /**
   * Add new car to database.
   * @param car New car.
   */
  public addNewCar(car: Car): Observable<void> {
    const dto = this.carMapper.toDto(car);
    return this.databaseService.postItem(CARS_COLLECTION_ID, dto);
  }

  /**
   * Update passed car data.
   * @param car Car to update.
   */
  public updateCar(car: Car): Observable<void> {
    const dto = this.carMapper.toDto(car);
    return this.databaseService.updateItem(CARS_COLLECTION_ID, dto);
  }

  /**
   * Delete car from database by id.
   * @param carId Id of car to delete.
   */
  public deleteCar(carId: string): Observable<void> {
    return this.databaseService.deleteItem(CARS_COLLECTION_ID, carId);
  }
}
