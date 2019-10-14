import { AssignedObject } from './assigned-object.class';

class SimpleObject extends AssignedObject {
  a: string = null;
  b = 22;
  d: string = null;
}

describe('AssignObject', () => {
  it('should load simple objects', () => {
    const s = new SimpleObject().assign({ a: 'aa', b: 44 });
    expect(s.a).toBe('aa');
    expect(s.b).toBe(44);
  });
  it('should not load not available parameters', () => {
    const s = new SimpleObject().assign({ c: 234 });
    // tslint:disable-next-line
    expect(s['c']).toBeUndefined();
  });

  it('should load default values', () => {
    const s = new SimpleObject().assign({ c: 234 });
    expect(s.b).toBe(22);
  });
});
