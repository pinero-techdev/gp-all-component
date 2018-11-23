export class DataChangeEvent<T> {
    data: T;
    changeValue: (data: T) => void;
}