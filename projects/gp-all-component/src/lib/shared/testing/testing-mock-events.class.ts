export class TestingMockEvents {
    public triggerClickOn($element: Element) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        $element.dispatchEvent(event);
    }
}
