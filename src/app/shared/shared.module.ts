import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EnumToArrayPipe } from './pipes/enum-to-array.pipe';
import { GetEnumLabelPipe } from './pipes/get-enum-label.pipe';

/**
 * Shared module.
 */
@NgModule({
  imports: [CommonModule],
  declarations: [EnumToArrayPipe, GetEnumLabelPipe],
  exports: [EnumToArrayPipe, GetEnumLabelPipe],
})
export class SharedModule {}
