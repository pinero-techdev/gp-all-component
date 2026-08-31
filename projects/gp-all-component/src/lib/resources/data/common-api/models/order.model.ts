import { OrderBy } from './order-by.model';
import { OrderDirection } from '../enums/order-direction.enum';

// El backend lanza NullPointerException si orderBy/orderDirection llegan a null
export class Order {
  orderBy?: OrderBy;
  orderDirection?: OrderDirection;

  constructor() {
    this.orderBy = new OrderBy();
    this.orderDirection = OrderDirection.ASC;
  }
}
