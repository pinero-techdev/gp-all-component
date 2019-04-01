export class CachedElement {
    data: any;
    ttl: number;

    constructor(data: any, ttl: number) {
        this.data = data;
        this.ttl = ttl;
    }
}