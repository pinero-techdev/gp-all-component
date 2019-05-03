import { interval, Subscription } from 'rxjs';
import { fakeAsync, tick } from '@angular/core/testing';
import { take, first } from 'rxjs/operators';

class TestingUnsubscribeSpec {
  observable1 = interval(400);
  observable2 = interval(300);
  subscription: Subscription = null;

  initTake() {
    this.subscription = this.observable1.pipe(take(1)).subscribe((x) => console.log('first: ' + x));
    const childSubscription = this.observable2
      .pipe(take(1))
      .subscribe((x) => console.log('second: ' + x));
    this.subscription.add(childSubscription);
  }

  initFirst() {
    this.subscription = this.observable1.pipe(first()).subscribe((x) => console.log('first: ' + x));
    const childSubscription = this.observable2
      .pipe(first())
      .subscribe((x) => console.log('second: ' + x));
    this.subscription.add(childSubscription);
  }

  init() {
    this.subscription = this.observable1.subscribe((x) => console.log('first: ' + x));
    const childSubscription = this.observable2.subscribe((x) => console.log('second: ' + x));
    this.subscription.add(childSubscription);
  }
}

describe('TestingUnsubscribe', () => {
  const testing = new TestingUnsubscribeSpec();

  describe('When take(1) is used', () => {
    it('should unsubscribe', fakeAsync(() => {
      testing.initTake();
      spyOn(testing.subscription, 'unsubscribe');
      tick(2000);
      expect(testing.subscription.unsubscribe).toHaveBeenCalled();
    }));
  });

  describe('When first() is used', () => {
    it('should unsubscribe', fakeAsync(() => {
      testing.initFirst();
      spyOn(testing.subscription, 'unsubscribe');
      tick(2500);
      expect(testing.subscription.unsubscribe).toHaveBeenCalled();
    }));
  });

  xdescribe('When nothing is used', () => {
    it('should unsubscribe', fakeAsync(() => {
      testing.init();
      spyOn(testing.subscription, 'unsubscribe');
      tick(1000);
      expect(testing.subscription.unsubscribe).not.toHaveBeenCalled();
      testing.subscription.unsubscribe();
      expect(testing.subscription.unsubscribe).toHaveBeenCalled();
    }));
  });
});
