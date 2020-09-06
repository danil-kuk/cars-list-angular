import { GetEnumLabelPipe } from './get-enum-label.pipe';

describe('ParseRolePipe', () => {
  it('create an instance', () => {
    const pipe = new GetEnumLabelPipe();
    expect(pipe).toBeTruthy();
  });
});
