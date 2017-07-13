import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { CustomHttpService } from './default.header.service';
import { Configuration } from './app.constant';


@Injectable()
export class AdminService {
  private baseUrl: string = "";

  constructor(private http: CustomHttpService,
               public htttp: Http,
               private con: Configuration,
               ) {
    // this.baseUrl = this.config.getUrl();
  }

  getSubjects() {
    return this.http.get("https://cornerstone.ind-cloud.everdata.com" + "/subject")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getStandards() {
    return this.http.get("https://cornerstone.ind-cloud.everdata.com" + "/standard")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getParents() {
    return this.http.get("https://cornerstone.ind-cloud.everdata.com/admin/parent")
      .map(this.extractData)
      .catch(this.handleError);
  }

  addEmployee(data: any) {
    return this.http.post("https://cornerstone.ind-cloud.everdata.com/admin/employee", data)
      .map(this.extractData)
      .catch(this.handleError);
  }
  addStudent(data: any) {
    return this.http.post("https://cornerstone.ind-cloud.everdata.com/admin/parent", data)
      .map(this.extractData)
      .catch(this.handleError);
  }
  addStudentWithExistingUser(data: any) {
    return this.http.post("https://cornerstone.ind-cloud.everdata.com/admin/students", data)
      .map(this.extractData)
      .catch(this.handleError);
  }
  getStudentsByParentId(id: any) {
    return this.http.get("https://cornerstone.ind-cloud.everdata.com/admin/parent/" + id + "/student")
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteStudent(id: any) {
    return this.http.delete("https://cornerstone.ind-cloud.everdata.com/admin/student/" + id)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateStudent(id: any, object: any) {
    return this.http.put("https://cornerstone.ind-cloud.everdata.com/admin/student/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateParent(id: any, object: any) {
    delete object['id'];
    return this.http.put("https://cornerstone.ind-cloud.everdata.com/admin/parent/" + id, object)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    if (res.status === 204) { return res; }
    let body = res.json();
    return body || {};
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.ok || 'Bad Request'}`;
      if (error.status === 0) {
        errMsg = `${error.status} - "No Internet"`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  public uploadImage(data: any, id:any) {
    var option = new RequestOptions({
      headers: new Headers({
        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
      })
    });
    return this.htttp.post(this.con.baseUrl + "management/" + id + "/picture", data, option)
      .map(this.extractData)
      .catch(this.handleError);
  }

}