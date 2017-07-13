import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Response,Http,Headers,RequestOptions} from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Configuration} from './app.constant';
import {CustomHttpService} from './default.header.service';

@Injectable()
export class EventService{
public serveUrl:string="";
  constructor(
    private http:Http,
    private htttp:CustomHttpService,
    private con:Configuration
  ){
    this.serveUrl=this.con.Server;
  }
  
  getEvents(eventMonth){
    return this.http.get(this.serveUrl + '/month/' + eventMonth)
    .map(this.extractData)
    .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || { };
  }

  private handleError(error: Response | any) {
let errMsg: string;
if (error instanceof Response) {
errMsg = `${error.status} - ${error.ok || ''}`;
if (error.status === 0) {
errMsg = `${error.status} - "No Internet"`;
}
} else {
errMsg = error.message ? error.message : error.toString();
}
return Observable.throw(errMsg);
}
}