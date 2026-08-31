import { DataTableFilter } from '../../data-table/filter/data-table-filter.model';
import { DataTableSort } from '../../data-table/sort/data-table-sort.model';
import { Brand } from '../enums/brand.enum';
import { Language } from '../enums/language.enum';
import { Order } from './order.model';
import { Pagination } from './pagination.model';

export class CommonRq {
  brand?: Brand;
  languageCode?: Language;

  // orden -> Order (orderBy + orderDirection); rows/firstRow -> Pagination (limit/offset)
  order?: Order;
  rows?: number;
  firstRow?: number;
  pagination?: Pagination;
  sort?: DataTableSort[];
  filters?: DataTableFilter[];
  obtainTotalRows?: boolean;
  sessionId?: string;
  idioma?: string; // duplicado de languageCode, revisar si se puede eliminar
}
