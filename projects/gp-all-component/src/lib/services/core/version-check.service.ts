import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class VersionCheckService {
  constructor(public http: HttpClient) {}

  getVersion() {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', './assets/version.json', false);
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
  }
}
