import { Attachment } from '../../../components/table-wrapper/components/table-editable-crud/resources/attachment.class';
import { CommonRs, CommonService } from '../../core/common.service';
import { Filter } from './../../../resources/data/filter/filter.model';
import { GlobalService } from '../../core/global.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FieldMetadata } from '../../../resources/data/data-table/meta-data/meta-data-field.model';

export class ListRs extends CommonRs {
  data: any[];
  metadata: FieldMetadata;
}

export class MetadataRs extends CommonRs {
  metadata: FieldMetadata;
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
  metadata: FieldMetadata;
}

export class GetAttachmentRq extends SelectOneRowRq {
  fieldName: string;
  asAttachment = true;
}

export class FileRs {
  blob: Blob;
  fileName: string;
}

@Injectable({ providedIn: 'root' })
export class TableService extends CommonService {
  constructor(http: HttpClient) {
    super(http);
  }

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
    translationLanguage?: string,
    referencedMethod = 'list'
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

    let body = {
      retrieveMetadata,
      ordered: order,
      fieldsToOrderBy: fieldsToOrder,
      filters: filtersRq,
    };

    if (translate) {
      body = { ...body, ...{ translate } };
    }

    if (translationLanguage) {
      body = { ...body, ...{ translationLanguage } };
    }

    if (!referencedMethod) {
      referencedMethod = 'list';
    }

    return this.post<ListRs>(
      `${GlobalService.getBASE_URL()}/table_svc/${tableName}/${referencedMethod}`,
      body
    );
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
