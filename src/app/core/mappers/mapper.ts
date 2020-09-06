/**
 * Mapper interface.
 */
export interface Mapper<TDto, TModel> {
  /**
   * Create and return new class instance from passed dto.
   * @param dto Dto to read.
   */
  fromDto(dto: TDto): TModel;

  /**
   * Create and return new dto from passed domain.
   * @param dto Domain model to read.
   */
  toDto(domain: TModel): TDto;
}
