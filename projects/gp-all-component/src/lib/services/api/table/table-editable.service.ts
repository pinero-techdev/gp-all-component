import {Injectable} from '@angular/core';
import {GlobalService} from '../../core/global.service';
import {CommonService} from '../../core/common.service';
import {Filter} from '../../../resources/data/filter/filter.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class TableEditableService {


  constructor(private httpClient: HttpClient) {

  }

  postApi(url, body: any): any {

    return this.httpClient.post<any>(GlobalService.getBASE_URL() + url, body, {
      headers: new HttpHeaders({
        Authorization: GlobalService.getSESSION_ID(),
      })
    });
  }

  getApi(url): any {

    return this.httpClient.get<any>(GlobalService.getBASE_URL() + url, {
      headers: new HttpHeaders({
        Authorization: GlobalService.getSESSION_ID(),
      })
    });
  }

  deleteApi(url): any {

    return this.httpClient.delete<any>(GlobalService.getBASE_URL() + url, {
      headers: new HttpHeaders({
        Authorization: GlobalService.getSESSION_ID(),
      })
    });
  }

  fileUpload(businessCode, invoiceId, body) {

    const fileData: FormData = new FormData();
    fileData.append('file', body);

    const heads = new HttpHeaders({
      Authorization: GlobalService.getSESSION_ID(),

    });
    const options = {headers: heads};

    return this.httpClient.post<any>(
      `${GlobalService.getBASE_URL()}/gpinvoiceinbox/fileUpload/` + businessCode + '/' + invoiceId,
      fileData, options);
  }

}