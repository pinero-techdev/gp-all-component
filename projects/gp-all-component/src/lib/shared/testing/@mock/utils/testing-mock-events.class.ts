export class TestingMockEvents {
  static triggerClickOn($element: Element) {
    $element.dispatchEvent(this.createEvent('click'));
  }

  static triggerBlur($element: Element) {
    $element.dispatchEvent(this.createEvent('focusout'));
  }

  static triggerEnterKey($element: Element) {
    $element.dispatchEvent(this.createKeyboardEvent('keyup', 'Enter'));
  }

  static triggerKeyUpEvent($element: Element, char: string = 'a') {
    $element.dispatchEvent(this.createKeyboardEvent('keyup', char));
  }

  /**/
  private static createEvent(typeEvent: string): Event {
    const event = document.createEvent('HTMLEvents');
    event.initEvent(typeEvent, false, true);
    return event;
  }

  private static createKeyboardEvent(typeEvent: string, keyCode: string): KeyboardEvent {
    const options: KeyboardEventInit = {
      bubbles: true,
      cancelable: true,
      code: keyCode,
      key: keyCode,
    };
    return new KeyboardEvent(typeEvent, options);
  }
}
