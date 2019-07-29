import { MemoPipe } from './memo.pipe';

describe('MemoPipe', () => {
  it('create an instance', () => {
    const pipe = new MemoPipe();
    expect(pipe).toBeTruthy();
  });
});
