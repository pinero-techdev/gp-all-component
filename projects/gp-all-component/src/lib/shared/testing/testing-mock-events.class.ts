export class TestingMockEvents {
    public triggerClickOn($element: HTMLElement) {
        const event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        $element.dispatchEvent(event);
    }
}
