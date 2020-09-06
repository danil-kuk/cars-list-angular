import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Car, CarBodyType } from 'src/app/core/models';
import { CarService, UserService } from 'src/app/core/services';

import { CarsEditorComponent } from '../cars-editor/cars-editor.component';

/**
 * Cars list component.
 */
@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsListComponent implements OnInit, OnDestroy {
  /** RxJS Subject to destroy all subscriptions. */
  private readonly destroy$ = new Subject<void>();

  /** Cars list data source Observable. */
  public carsDataSourse$: Observable<MatTableDataSource<Car>>;

  /** Enum type to parse. */
  public readonly enumToParse = CarBodyType;

  /** Columns that will be displayed in table. */
  private readonly defaultTableColumns: string[] = [
    'producer',
    'model',
    'bodyType',
    'year',
    'mileage',
    'description',
    'created',
    'updated',
  ];

  private readonly adminTableColumns: string[] = [
    ...this.defaultTableColumns,
    'actions',
  ];

  /** Columns that will be displayed in table. */
  public get tableColumns(): string[] {
    let columns = this.defaultTableColumns;
    this.isAdmin$.pipe(takeUntil(this.destroy$)).subscribe((isAdmin) => {
      if (isAdmin) {
        columns = this.adminTableColumns;
      }
    });
    return columns;
  }

  /**
   * Check if current user is Admin.
   */
  public get isAdmin$(): Observable<boolean> {
    return this.userService.isCurrentUserAdmin();
  }

  /** Table data pagination. */
  @ViewChild(MatPaginator)
  public readonly paginator: MatPaginator;

  /** Table data sorting. */
  @ViewChild(MatSort)
  public readonly sort: MatSort;

  /**
   * Create cars list component.
   * @param carService Service to manage cars.
   * @param dialog Dialog where editor form is displayed.
   * @param userService Service to manage users.
   */
  constructor(
    private carService: CarService,
    private dialog: MatDialog,
    private userService: UserService,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.initCarsDataSource();
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Get cars data from server and save it to cache.
   */
  private initCarsDataSource(): void {
    this.carsDataSourse$ = this.carService.getCars().pipe(
      map((cars) => {
        const data = new MatTableDataSource<Car>(cars);
        data.sort = this.sort;
        data.paginator = this.paginator;
        return data;
      }),
    );
  }

  /**
   * Find cars by keyword.
   * @param keyword Keyword to search by.
   */
  public findCarsByKeyword(keyword: string): void {
    this.carsDataSourse$ = this.carsDataSourse$.pipe(
      map((data) => {
        data.filter = keyword.trim().toLocaleLowerCase();
        return data;
      }),
    );
  }

  /**
   * Delete car from list by id.
   * @param carId Id of car to delete.
   */
  public deleteCar(carId: string): void {
    this.carService.deleteCar(carId).pipe(takeUntil(this.destroy$)).subscribe();
  }

  /**
   * Open dialog with car editor form.
   */
  public openDialog(selectedCar?: Car): void {
    const dialogRef = this.dialog.open(CarsEditorComponent, {
      width: '600px',
      data: selectedCar,
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe();
  }
}
