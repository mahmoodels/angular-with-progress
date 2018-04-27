import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent, HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';

@Injectable()
export class CardService {

  constructor(private _http: HttpClient) { }

  sendData(file, notify, callback) {
    const frm = new FormData();
    frm.append('file', file, file.name);
    const req = new HttpRequest('POST', 'http://localhost:3000/upload', frm, {
      reportProgress: true
    });

    // this._http.get<WebserviceResponse>('http://localhost:3000/getData/5000').subscribe(data =>
    //   callback(data)
    // );

    return this._http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap(progress => notify(progress, file)),
      last() // return last (completed) message to caller
    ).subscribe(data => callback(data));
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log(`Uploading file "${file.name}" of size ${file.size}.`);
        return 0;

      case HttpEventType.UploadProgress:
        // Compute and show the % done:
        const percentDone = Math.round(100 * event.loaded / event.total);
        console.log(`File "${file.name}" is ${percentDone}% uploaded.`);
        return percentDone;
      case HttpEventType.Response:
        console.log(`File "${file.name}" was completely uploaded!`);
        return file.size;

      // default:
      //   return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}


export class WebserviceResponse {
  public success?: any;
  public data?: any;
}
