/**
 * Servicio de acceso a tablas.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable'

import {GlobalService} from "./global.service";

import {CommonService, CommonRs} from "./common.service";
import {Http} from "@angular/http";

export class ListRs extends CommonRs {
  data: any[];
  metadata: TableMetadata;
}

export class MetadataRs extends CommonRs {
  metadata: TableMetadata;
}

export class UpdateRowRq {
  jsonModifiedRow: string;
  jsonOriginalRow: string;
}

export class UpdateRowRs extends CommonRs {
}

export class DeleteRowRq {
  jsonOriginalRow: string;
}

export class DeleteRowRs extends CommonRs {
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
  metadata: TableMetadata;
}

export class TableMetadata {
  fields: FieldMetadata[];
  tableLabel: string;
}

export class FieldMetadata {
  fieldMaxLength: number;
  fieldName: string;
  fieldType: string;
  id: boolean;
  notNull: boolean;
  readOnly: boolean;
  allowAscii: boolean;
  hideInAddOperation: boolean;
  lengthInTable: number;
  restrictions: FieldRestriction[];
  displayInfo : FieldDisplayInfo;

  constructor(fieldMaxLength: number, fieldName: string, fieldType: string, id: boolean, notNull: boolean, readOnly: boolean, allowAscii: boolean, lengthInTable: number, restrictions: FieldRestriction[], displayInfo: FieldDisplayInfo) {
    this.fieldMaxLength = fieldMaxLength;
    this.fieldName = fieldName;
    this.fieldType = fieldType;
    this.id = id;
    this.notNull = notNull;
    this.readOnly = readOnly;
    this.allowAscii = allowAscii;
    this.lengthInTable = lengthInTable;
    this.restrictions = restrictions;
    this.displayInfo = displayInfo;
  }
}

export class FieldRestriction {
  restrictionType: string;
  minLength: number;
  maxLength: number;
}

export class FieldDisplayInfo {
  fieldLabel: string;
  order: number;
  displayType: string;
  checkedValue: string;
  uncheckedValue : string;
  options : FieldOption[];
  referencedTable : string;
  referencedField : string;
  fieldToOrderBy: string;
  filters: Filter[];
  rowsTextArea : number;
  fieldDescriptions : string[];
  textProperties: string[];
  relatedField: string;
  translationInfo: TranslationInfo;


  constructor(fieldLabel:string, order:number, displayType:string, checkedValue:string, uncheckedValue:string, options:FieldOption[], referencedTable:string, referencedField:string, fieldToOrderBy:string, filters:Filter[], rowsTextArea:number, fieldDescriptions:string[], textProperties:string[], relatedField:string, translationInfo:TranslationInfo) {
    this.fieldLabel = fieldLabel;
    this.order = order;
    this.displayType = displayType;
    this.checkedValue = checkedValue;
    this.uncheckedValue = uncheckedValue;
    this.options = options;
    this.referencedTable = referencedTable;
    this.referencedField = referencedField;
    this.fieldToOrderBy = fieldToOrderBy;
    this.filters = filters;
    this.rowsTextArea = rowsTextArea;
    this.fieldDescriptions = fieldDescriptions;
    this.textProperties = textProperties;
    this.relatedField = relatedField;
    this.translationInfo = translationInfo;
  }
}

export class TranslationInfo {
  keyFields: string[] = [];
  scheme: string;
  table: string;
  field: string;
  description: string;
  allowEdition: boolean;
  orderByLangCod: boolean;
}

export class FieldOption {
  value: string;
  description: string;
}

export class FilterOperationType {
  static EQUAL = "EQUAL"; //Operación de comparativa de igualdad respecto a un valor
  static NOT_EQUAL = "NOT_EQUAL"; //Operación de comparativa de diferencia a un valor
  static NULL = "NULL";  //Operación de comparativa de nulidad del campo
  static NOT_NULL = "NOT_NULL"; //Operación de comparativa no nulidad de un campo
  static GT = "GT";  //Operación de comparativa mayor a un valor
  static GTE = "GTE"; //Operación de comparativa mayor o igual a un valor
  static LT = "LT"; //Operación de comparativa menor a un valor
  static LTE = "LTE";  //Operación de comparativa menor o igual a un valor
  static BETWEEN = "BETWEEN";  //Operación de comparativa campo entre dos valores
  static IN = "IN"; // Operación que devuelve los campos que se encuentren entre los valores proporcionados
  static NOT_IN = "NOT_IN"; // Operación que devuelve los campos que no se encuentren entre los valores proporcionados
}
export class Filter {
  constructor( public op: FilterOperationType, public field: string, public values: string[]){}
}

@Injectable()
export class TableService extends CommonService {

  constructor(private http2: Http) {
    super(http2);
  }


  public static STRING_FIELD_TYPE = "STRING";
  public static NUMBER_FIELD_TYPE = "NUMBER";
  public static DATE_FIELD_TYPE = "DATE";
  public static BOOLEAN_FIELD_TYPE = "BOOLEAN";

  public static IMG_DISPLAY_TYPE = "IMG";
  public static TEXT_DISPLAY_TYPE = "TEXT";
  public static DROPDOWN_DISPLAY_TYPE = "DROPDOWN";
  public static DROPDOWN_RELATED_DISPLAY_TYPE = "DROPDOWN_RELATED";
  public static CHECKBOX_DISPLAY_TYPE = "CHECKBOX";
  public static SWITCH_DISPLAY_TYPE = "SWITCH";
  public static CALENDAR_DISPLAY_TYPE = "CALENDAR";
  public static HOUR_MINUTE_DISPLAY_TYPE = "HOUR_MINUTE";
  public static TEXT_AREA_DISPLAY_TYPE = "TEXT_AREA";
  public static WYSIWYG_DISPLAY_TYPE = "WYSIWYG";

  public static RESTRICTION_NOT_NULL = "NOT_NULL";
  public static RESTRICTION_MAX_LENGTH = "MAX_LENGTH";
  public static RESTRICTION_MIN_LENGTH = "MIN_LENGTH";
  public static RESTRICTION_MAX_VALUE = "MAX_VALUE";
  public static RESTRICTION_MIN_VALUE = "MIN_VALUE";
  public static RESTRICTION_LIST_ALLOWED_VALUES = "LIST_ALLOWED_VALUES";

  public static TEXT_UPPERCASE = "UPPERCASE";
  public static TEXT_TRIM = "TRIM";
  public static TEXT_NO_SPACE = "NO_SPACE";

  /**
   * Llamada para obtener la metadata de una tabla.
   * @returns Json con la sesión del usuario
   */
  metadata( tableName: string ) : Observable<MetadataRs> {
    return this.serviceRequest<MetadataRs>(
      `${GlobalService.BASE_URL}/table_svc/${tableName}/metadata`,
      {} );
  }

  /**
   * Llamada al WS para obtener una lista de registros.
   */
  list( tableName : string, retrieveMetadata : boolean, ordered?: boolean, fieldsToOrderBy?: string[], filters?: Filter[]) : Observable<ListRs> {
    let order = true;
    let fieldsToOrder = null;
    let filtersRq =  null;

    if (ordered != null) {
      order = ordered;
    }
    if (fieldsToOrderBy != null) {
      fieldsToOrder = fieldsToOrderBy;
    }
    if (filters) {
      filtersRq = filters;
    }

      return this.serviceRequest<ListRs>(
          `${GlobalService.BASE_URL}/table_svc/${tableName}/list`,
        { retrieveMetadata: retrieveMetadata,
          ordered: order, fieldsToOrderBy: fieldsToOrder, filters: filtersRq} );
  }

  cachelist( tableName : string, retrieveMetadata : boolean, ordered?: boolean, fieldsToOrderBy?: string[], filters?: Filter[]) : Observable<ListRs> {
    let order = true;
    let fieldsToOrder = null;
    let filtersRq =  null;

    if (ordered != null) {
      order = ordered;
    }
    if (fieldsToOrderBy != null) {
      fieldsToOrder = fieldsToOrderBy;
    }
    if (filters) {
      filtersRq = filters;
    }

    return this.cachedServiceRequest<ListRs>(
        `${GlobalService.BASE_URL}/table_svc/${tableName}/list`,
        { retrieveMetadata: retrieveMetadata,
          ordered: order, fieldsToOrderBy: fieldsToOrder, filters: filtersRq} );
  }

  /**
   * Llamada al WS para obtener un registro.
   */
  selectOneRow( tableName : string, registro : any ) : Observable<SelectOneRowRs> {

    let rq = new SelectOneRowRq();
    rq.jsonRowToSelect = JSON.stringify( registro );
    console.log(rq);
    return this.serviceRequest<SelectOneRowRs>(
        `${GlobalService.BASE_URL}/table_svc/${tableName}/selectOneRow`,
        rq );
  }

  /**
   * Llamada para actualizar un registro.
   */
  updateRow( tableName : string, original : any, modificado : any ) : Observable<UpdateRowRs> {
    let rq = new UpdateRowRq();
    rq.jsonOriginalRow = JSON.stringify( original);
    rq.jsonModifiedRow = JSON.stringify( modificado );
    return this.serviceRequest<UpdateRowRs>(
      `${GlobalService.BASE_URL}/table_svc/${tableName}/updateRow`,
      rq );
  }

  /**
   * Llamada para borrar un registro.
   */
  deleteRow( tableName : string, original : any ) : Observable<DeleteRowRs> {
    let rq = new DeleteRowRq();
    rq.jsonOriginalRow = JSON.stringify( original);
    return this.serviceRequest<DeleteRowRs>(
      `${GlobalService.BASE_URL}/table_svc/${tableName}/deleteRow`,
      rq);
  }

  /**
   * Llamada para insertar un registro.
   */
  insertRow( tableName : string, original : any ) : Observable<InsertRowRs> {
    let rq = new InsertRowRq();
    rq.jsonNewRow = JSON.stringify( original);
    return this.serviceRequest<InsertRowRs>(
      `${GlobalService.BASE_URL}/table_svc/${tableName}/insertRow`,
      rq );
  }

}
