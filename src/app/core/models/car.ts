import { CarBodyType } from './car-body-type';

/**
 * Car.
 */
export class Car {
  /**
   * Car id in database.
   */
  public id: string;

  /**
   * Car producer.
   */
  public producer: string;

  /**
   * Car model.
   */
  public model: string;

  /**
   * Car body type.
   */
  public bodyType: CarBodyType;

  /**
   * Year of car manufacture.
   */
  public year: number;

  /**
   * Car mileage.
   */
  public mileage: number;

  /**
   * Some info about car.
   */
  public description: string;

  /**
   * Date when car was added to database.
   */
  public created: Date;

  /**
   * Date when car data was last updated.
   */
  public updated: Date;

  /** Create new car.
   * @param carData Car data.
   */
  constructor(carData: Partial<Car>) {
    this.id = carData.id;
    this.producer = carData.producer;
    this.model = carData.model;
    this.bodyType = carData.bodyType;
    this.year = carData.year;
    this.mileage = carData.mileage;
    this.description = carData.description;
    this.created = carData.created;
    this.updated = carData.updated;
  }
}
