import { IsNilPipe } from './is-nil.pipe';

describe('IsNilPipe', () => {
  it('create an instance', () => {
    const pipe = new IsNilPipe();
    expect(pipe).toBeTruthy();
  });
});
