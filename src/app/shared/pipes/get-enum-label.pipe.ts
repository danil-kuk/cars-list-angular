import { Pipe, PipeTransform } from '@angular/core';

/**
 * Transform number input to passed Enum.
 */
@Pipe({
  name: 'getEnumLabel',
})
export class GetEnumLabelPipe implements PipeTransform {
  /**
   * Transforms number to passed Enum label.
   * @param value Value to parse.
   */
  public transform(value: number, enumToParse: object): string {
    return enumToParse[value];
  }
}
