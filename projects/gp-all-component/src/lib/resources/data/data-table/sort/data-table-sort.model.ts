export class DataTableSort {
    field: string;
    order: number;

    constructor(field: string, order: number) {
        this.field = field;
        this.order = order;
    }
}
