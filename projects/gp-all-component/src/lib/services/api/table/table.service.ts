import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTableMetaData } from './../../../resources/data/data-table/meta-data/data-table-meta-data.model';
import { Filter } from '../../../resources/data/filter/filter.model';
import { CommonRs, CommonService } from '../../core/common.service';
import { GlobalService } from '../../core/global.service';

export class ListRs extends CommonRs {
  data: any[];
  metadata: DataTableMetaData;
}

export class MetadataRs extends CommonRs {
  metadata: DataTableMetaData;
}

export class UpdateRowRq {
  jsonModifiedRow: string;
  jsonOriginalRow: string;
}

export class DeleteRowRq {
  jsonOriginalRow: string;
}

export class InsertRowRq {
  jsonNewRow: string;
}

export class InsertRowRs extends CommonRs {
  insertedRow: any;
}

export class SelectOneRowRq {
  jsonRowToSelect: string;
}

export class SelectOneRowRs extends CommonRs {
  data: any;
  metadata: DataTableMetaData;
}

@Injectable({ providedIn: 'root' })
export class TableService extends CommonService {
  constructor(http: HttpClient) {
    super(http);
  }

  public static STRING_FIELD_TYPE = 'STRING';
  public static NUMBER_FIELD_TYPE = 'NUMBER';
  public static DATE_FIELD_TYPE = 'DATE';
  public static BOOLEAN_FIELD_TYPE = 'BOOLEAN';

  public static IMG_DISPLAY_TYPE = 'IMG';
  public static TEXT_DISPLAY_TYPE = 'TEXT';
  public static DROPDOWN_DISPLAY_TYPE = 'DROPDOWN';
  public static DROPDOWN_RELATED_DISPLAY_TYPE = 'DROPDOWN_RELATED';
  public static CHECKBOX_DISPLAY_TYPE = 'CHECKBOX';
  public static SWITCH_DISPLAY_TYPE = 'SWITCH';
  public static CALENDAR_DISPLAY_TYPE = 'CALENDAR';
  public static HOUR_MINUTE_DISPLAY_TYPE = 'HOUR_MINUTE';
  public static TEXT_AREA_DISPLAY_TYPE = 'TEXT_AREA';
  public static WYSIWYG_DISPLAY_TYPE = 'WYSIWYG';

  public static TEXT_UPPERCASE = 'UPPERCASE';
  public static TEXT_TRIM = 'TRIM';
  public static TEXT_NO_SPACE = 'NO_SPACE';

  /**
   * Llamada para obtener la metadata de una tabla.
   * @returns Json con la sesión del username
   */
  metadata(tableName: string): Observable<MetadataRs> {
    return this.post<MetadataRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/metadata`,
      {}
    );
  }

  /**
   * Llamada al WS para obtener una lista de registros.
   */
  list(
    tableName: string,
    retrieveMetadata: boolean,
    ordered?: boolean,
    fieldsToOrderBy?: string[],
    filters?: Filter[],
    translate?: boolean,
    translationLanguage?: string
  ): Observable<ListRs> {
    let order = true;
    let fieldsToOrder = null;
    let filtersRq = null;

    if (ordered !== null) {
      order = ordered;
    }
    if (fieldsToOrderBy !== null) {
      fieldsToOrder = fieldsToOrderBy;
    }
    if (filters) {
      filtersRq = filters;
    }

    return this.post<ListRs>(`${GlobalService.getBASE_URL()}/table_svc/${tableName}/list`, {
      retrieveMetadata,
      ordered: order,
      fieldsToOrderBy: fieldsToOrder,
      filters: filtersRq,
      translate,
      translationLanguage,
    });
  }

  cachelist(
    tableName: string,
    retrieveMetadata: boolean,
    ordered?: boolean,
    fieldsToOrderBy?: string[],
    filters?: Filter[]
  ): Observable<ListRs> {
    let order = true;
    let fieldsToOrder = null;
    let filtersRq = null;

    if (ordered !== null) {
      order = ordered;
    }
    if (fieldsToOrderBy !== null) {
      fieldsToOrder = fieldsToOrderBy;
    }
    if (filters) {
      filtersRq = filters;
    }

    return this.fromCache<ListRs>(`${GlobalService.getBASE_URL()}/table_svc/${tableName}/list`, {
      retrieveMetadata,
      ordered: order,
      fieldsToOrderBy: fieldsToOrder,
      filters: filtersRq,
    });
  }

  /**
   * Llamada al WS para obtener un registro.
   */
  selectOneRow(tableName: string, registro: any): Observable<SelectOneRowRs> {
    const rq = new SelectOneRowRq();
    rq.jsonRowToSelect = JSON.stringify(registro);
    return this.post<SelectOneRowRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/selectOneRow`,
      rq
    );
  }

  /**
   * Llamada para actualizar un registro.
   */
  updateRow(tableName: string, original: any, modificado: any): Observable<CommonRs> {
    const rq = new UpdateRowRq();
    rq.jsonOriginalRow = JSON.stringify(original);
    rq.jsonModifiedRow = JSON.stringify(modificado);
    return this.post<CommonRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/updateRow`,
      rq
    );
  }

  /**
   * Llamada para borrar un registro.
   */
  deleteRow(tableName: string, original: any): Observable<CommonRs> {
    const rq = new DeleteRowRq();
    rq.jsonOriginalRow = JSON.stringify(original);
    return this.post<CommonRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/deleteRow`,
      rq
    );
  }

  /**
   * Llamada para insertar un registro.
   */
  insertRow(tableName: string, original: any): Observable<InsertRowRs> {
    const rq = new InsertRowRq();
    rq.jsonNewRow = JSON.stringify(original);
    return this.post<InsertRowRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/insertRow`,
      rq
    );
  }
}
