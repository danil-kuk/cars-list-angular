import { DatabaseItem } from './database-item';

/**
 * Car Dto.
 */
export interface CarDto extends DatabaseItem {
  /**
   * Car producer.
   */
  producer: string;

  /**
   * Car model.
   */
  model: string;

  /**
   * Car body type.
   */
  bodyType: string;

  /**
   * Year of car manufacture.
   */
  year: string;

  /**
   * Car mileage.
   */
  mileage: string;

  /**
   * Some info about car.
   */
  description: string;

  /**
   * Time when car was added to database.
   */
  created: string;

  /**
   * Time of car last update in database.
   */
  updated: string;
}
