import { Pipe, PipeTransform } from '@angular/core';
import { EnumItem } from 'src/app/core/models';

/**
 * Transform passed Enum to array of Enum items.
 */
@Pipe({
  name: 'enumToArray',
})
export class EnumToArrayPipe implements PipeTransform {
  /**
   * Transform passed Enum array to EnumItem array.
   * @param sourceArray Array to parse.
   */
  public transform(sourceArray: object[]): EnumItem[] {
    const array = Object.values(sourceArray)
      .filter((key) => !isNaN(+key))
      .map((key) => ({
        value: +key,
        label: String(sourceArray[+key]),
      }));
    return array;
  }
}
