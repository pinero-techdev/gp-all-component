import { Filter } from './../../../resources/data/filter/filter.model';
import { CommonRs, CommonService } from '../../core/common.service';
import { DataTableMetaData } from './../../../resources/data/data-table/meta-data/data-table-meta-data.model';
import { GlobalService } from '../../core/global.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RelatedField } from '../../../resources/data/data-table/filter/related-field.class';
import { TranslationInfo } from './../../../resources/data/translation-info.model';
import { Attachment } from '../../../components/table-wrapper/components/table-editable-crud/resources/attachment.class';
import { map } from 'rxjs/operators';
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
  attachments: any[];
}

export class UpdateRowRs extends CommonRs {}

export class DeleteRowRq {
  jsonOriginalRow: string;
}

export class DeleteRowRs extends CommonRs {}

export class InsertRowRq {
  jsonNewRow: string;
  attachments: any[];
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

export class GetAttachmentRq extends SelectOneRowRq {
  fieldName: string;
  asAttachment = true;
}

export class TableMetadata {
  fields: FieldMetadata[];
  tableLabel: string;
}

export class FileRs {
  blob: Blob;
  fileName: string;
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
  displayInfo: FieldDisplayInfo;
  referenceDescription: string;

  constructor(
    fieldMaxLength: number,
    fieldName: string,
    fieldType: string,
    id: boolean,
    notNull: boolean,
    readOnly: boolean,
    allowAscii: boolean,
    lengthInTable: number,
    restrictions: FieldRestriction[],
    displayInfo: FieldDisplayInfo,
    referenceDescription: string
  ) {
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
    this.referenceDescription = referenceDescription;
  }
}

export class FieldRestriction {
  restrictionType: string;
  minLength: number;
  maxLength: number;
  maxValue?: number;
  minValue?: number;
}

export class FieldDisplayInfo {
  fieldLabel: string;
  order: number;
  displayType: string;
  checkedValue: string;
  uncheckedValue: string;
  options: FieldOption[];
  referencedTable: string;
  referencedField: string;
  fieldToOrderBy: string;
  filters: Filter[];
  rowsTextArea: number;
  fieldDescriptions: string[];
  textProperties: string[];
  relatedFields: RelatedField[];
  translationInfo: TranslationInfo;

  constructor(
    fieldLabel: string,
    order: number,
    displayType: string,
    checkedValue: string,
    uncheckedValue: string,
    options: FieldOption[],
    referencedTable: string,
    referencedField: string,
    fieldToOrderBy: string,
    filters: Filter[],
    rowsTextArea: number,
    fieldDescriptions: string[],
    textProperties: string[],
    relatedFields: RelatedField[],
    translationInfo: TranslationInfo
  ) {
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
    this.relatedFields = relatedFields;
    this.translationInfo = translationInfo;
  }
}

export class FieldOption {
  value: string;
  description: string;
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
  public static FILE_DISPLAY_TYPE = 'FILE';
  public static NULLABLE_CHECKBOX_DISPLAY_TYPE = 'NULLABLE_CHECKBOX';

  public static RESTRICTION_NOT_NULL = 'NOT_NULL';
  public static RESTRICTION_MAX_LENGTH = 'MAX_LENGTH';
  public static RESTRICTION_MIN_LENGTH = 'MIN_LENGTH';
  public static RESTRICTION_MAX_VALUE = 'MAX_VALUE';
  public static RESTRICTION_MIN_VALUE = 'MIN_VALUE';
  public static RESTRICTION_LIST_ALLOWED_VALUES = 'LIST_ALLOWED_VALUES';

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
  updateRow(
    tableName: string,
    original: any,
    modificado: any,
    attachments?: Attachment[]
  ): Observable<UpdateRowRs> {
    const rq = new UpdateRowRq();
    rq.jsonOriginalRow = JSON.stringify(original);
    rq.jsonModifiedRow = JSON.stringify(modificado);
    rq.attachments = attachments;
    return this.post<UpdateRowRs>(
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
  insertRow(tableName: string, original: any, attachments?: Attachment[]): Observable<InsertRowRs> {
    const rq = new InsertRowRq();
    rq.jsonNewRow = JSON.stringify(original);
    return this.post<InsertRowRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/insertRow`,
      rq
    );
  }

  downloadFile(tableName: string, item: any, field: string): Observable<FileRs> {
    const rq = new GetAttachmentRq();
    rq.jsonRowToSelect = JSON.stringify(item);
    rq.fieldName = field;
    return this.fileRequest(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/getAttachment`,
      rq
    ).pipe(
      map((response: HttpResponse<any>) => {
        const fileRs = new FileRs();
        fileRs.blob = response.body;
        const contentDisposition = response.headers.get('Content-Disposition');
        if (contentDisposition && contentDisposition !== '') {
          fileRs.fileName =
            contentDisposition.split('"').length >= 2
              ? contentDisposition.split('"')[1]
              : 'documento.' + fileRs.blob.type.split('/').pop();
        }
        return fileRs;
      })
    );
  }
}
