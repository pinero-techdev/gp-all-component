export class SaveEvent {
    original: any;
    modified: any;
    save: () => void;
    cancel: () => void;
}