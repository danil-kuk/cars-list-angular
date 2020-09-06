import {
  Component,
  OnInit,
  Inject,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarBodyType, Car } from 'src/app/core/models';
import { CarService } from 'src/app/core/services';

/**
 * Component for creating and editing cars.
 */
@Component({
  selector: 'app-cars-editor',
  templateUrl: './cars-editor.component.html',
  styleUrls: ['./cars-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsEditorComponent implements OnInit, OnDestroy {
  /** Car body types. */
  public readonly carBodyTypes = CarBodyType;

  /** RxJS Subject to destroy all subscriptions. */
  private readonly destroy$ = new Subject<void>();

  /** Form to edit car data. */
  public carEditorForm: FormGroup;

  /** Max possible car mileage. */
  public readonly carMaxMileage = 500000;

  /** Min possible car production year. */
  public readonly carMinYear = 2010;

  /** Max possible car production year. */
  public readonly carMaxYear = new Date().getFullYear();

  /**
   * Create car editor component.
   * @param carService Service to manage cars.
   * @param formBuilder Car editor form builder.
   * @param dialogRef Dialog ref.
   * @param carData Car to edit.
   */
  constructor(
    private carService: CarService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CarsEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private carData: Car,
  ) {}

  /**
   * @inheritdoc
   */
  public ngOnInit(): void {
    this.mapCarToEditorForm(this.carData);
  }

  /**
   * @inheritdoc
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Insert passed car data into editor form.
   * If no data is passed it will create an empty form.
   * @param car Car data to insert into form.
   */
  private mapCarToEditorForm(car?: Car): void {
    this.carEditorForm = this.formBuilder.group({
      producer: [car?.producer, Validators.required],
      model: [car?.model, Validators.required],
      bodyType: [car?.bodyType, Validators.required],
      year: [
        car?.year,
        [
          Validators.required,
          Validators.min(this.carMinYear),
          Validators.max(this.carMaxYear),
        ],
      ],
      mileage: [
        car?.mileage,
        [
          Validators.required,
          Validators.min(0),
          Validators.max(this.carMaxMileage),
        ],
      ],
      description: [car?.description, Validators.required],
      created: [car?.created],
      id: [car?.id],
    });
  }

  /**
   * Handle from submit.
   */
  public handleFormSubmit(): void {
    const carInForm: Car = this.carEditorForm.value;
    const car: Car = {
      ...carInForm,
      updated: new Date(),
      created: carInForm.created ?? new Date(),
    };
    if (car.id) {
      this.carService
        .updateCar(car)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.dialogRef.close());
    } else {
      this.carService
        .addNewCar(car)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }
}
