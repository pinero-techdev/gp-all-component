import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GlobalService } from './global.service';
import { CommonService } from './common.service';
import { DataTableFilterType } from 'gp-all-component/resources/data/dataTableFilterType';
import { Filter, ListRs, SelectOneRowRq, SelectOneRowRs } from 'gp-all-component/services/table.service';

/*  @author: 3digits*/

export class ColumnFilter {
  constructor(public op: DataTableFilterType, public field: string, public values: string) {}
}

export class PageRender {
  constructor(public rowsForPage: number, public actualPage: number, public resetFirst: boolean) {}
}

@Injectable()
export class ExtendTableService extends CommonService {
  public static LISTMETHOD = 'list';
  public static LAZYLOADINGMETHOD = 'pagerList';

  /**
   * Llamada al WS para obtener una lista de registros.
   */
  list(
    tableName: string,
    retrieveMetadata: boolean,
    ordered?: boolean,
    fieldsToOrderBy?: string[],
    filters?: Filter[],
    lazyloading?: boolean,
    columnsFilters?: DataTableFilterType[],
    pageRender?: PageRender,
    orderResult?: string,
    translate?: boolean,
    translationLanguage?: string
  ): Observable<ListRs> {
    let order = true;
    let fieldsToOrder = null;
    let filtersRq = null;
    let columnfiltersRq = null;
    let orderResultRq = null;

    if (ordered != null) {
      order = ordered;
    }
    if (fieldsToOrderBy != null) {
      fieldsToOrder = fieldsToOrderBy;
    }
    if (filters) {
      filtersRq = filters;
    }
    if (columnsFilters) {
      columnfiltersRq = columnsFilters;
    }
    if (orderResult != null) {
      orderResultRq = orderResult;
    }

    const method = lazyloading ? ExtendTableService.LAZYLOADINGMETHOD : ExtendTableService.LISTMETHOD;

    return this.serviceRequest<ListRs>(`${GlobalService.BASE_URL}/table_svc/${tableName}/${method}`, {
      retrieveMetadata: retrieveMetadata,
      ordered: order,
      fieldsToOrderBy: fieldsToOrder,
      filters: filtersRq,
      columnsFilters: columnfiltersRq,
      translate: translate,
      translationLanguage: translationLanguage,
      pageRender: pageRender,
      orderResult: orderResultRq
    });
  }

  /**
   * Llamada al WS para obtener una lista de valores.
   */
  getValuesLimit(tableName: string, filters?: Filter[]): Observable<ListRs> {
    let filtersRq = null;
    if (filters) {
      filtersRq = filters;
    }
    return this.serviceRequest<ListRs>(`${GlobalService.BASE_URL}/table_svc/${tableName}/getValuesLimit`, {
      filters: filtersRq
    });
  }

  /**
   * Llamada al WS para obtener un registro.
   */
  getValue(tableName: string, registro: any): Observable<SelectOneRowRs> {
    let rq = new SelectOneRowRq();
    rq.jsonRowToSelect = JSON.stringify(registro);
    console.log(rq);
    return this.serviceRequest<SelectOneRowRs>(`${GlobalService.BASE_URL}/table_svc/${tableName}/getValue`, rq);
  }
}
