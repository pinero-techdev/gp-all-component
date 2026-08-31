import { ProductType } from '../enums/product-type.enum';
import { ServiceType } from '../enums/service-type.enum';

export class Transferred {
  errorMessage?: string;
  identificador?: string;
  productType?: ProductType;
  serviceType?: ServiceType;
  transfered?: boolean;
}
