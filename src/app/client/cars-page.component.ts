import { Component, ChangeDetectionStrategy } from '@angular/core';

/**
 * Component for cars page.
 */
@Component({
  selector: 'app-cars-page',
  templateUrl: './cars-page.component.html',
  styleUrls: ['./cars-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarsPageComponent {}
