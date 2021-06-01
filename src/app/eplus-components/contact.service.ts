import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class ContactService {

  private tokenUrl = '/rest/session/token';
  private token: string;
  private contactUrl = '/contact_message?_format=json';

  constructor(@Inject(Http) private http: Http) {
    this.setupToken().subscribe(
      token => {
        this.token = token;
      },
      err => {
        console.log(err);
      });
  }

  setupToken(): Observable<string> {
    return this.http.get(this.tokenUrl)
      .map((res: Response) => this.token = res.text())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  addSubmission(body: Object): Observable<string> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers({'Content-Type': 'application/json', 'X-CSRF-Token': this.token});
    let options = new RequestOptions({headers: headers, withCredentials: true});

    return this.http.post(this.contactUrl, bodyString, options)
      .map((res: Response) => res.text())
    .catch((error: any) => Observable.throw(error.json().message || 'Ошибка сервера! Перезагрузите страницу и попробуйте еще раз'));
  }

}
