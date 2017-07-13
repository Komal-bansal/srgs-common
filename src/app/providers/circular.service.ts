import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Response, Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Configuration } from './app.constant';
import { CustomHttpService } from './default.header.service';

@Injectable()
export class CircularService {

public serverUrl: string;

constructor(private http: CustomHttpService,
private htttp: Http,
private con: Configuration) {
this.getUrl();
}

getUrl() {
this.serverUrl = this.con.Server;
}

public GetCirculars(pageNo:any) {
return this.http.get(this.serverUrl + '/circular/page/' + pageNo)
.map(this.extractData)
.catch(this.handleError);
}

public GetparticularCircular(id:any) {
return this.http.get(this.serverUrl + '/circular/' + id)
.map(this.extractData)
.catch(this.handleError);
}

public PostCircular(data:any) {

var options = new RequestOptions({
headers: new Headers({
'Authorization': 'Bearer ' + localStorage.getItem('access_token')
})
});

return this.htttp.post(this.serverUrl + '/circular', data, options)
.map(this.extractData)
.catch(this.handleError);
}

public getStandards() {
return this.http.get(this.serverUrl + '/homework/standard')
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