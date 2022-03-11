import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HelloModel} from "../../generated/model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HelloService {
  private readonly path = '/api/hello/world';

  constructor(private httpClient: HttpClient) { }

  getGreetingAsObservable(): Observable<HelloModel> {
    return this.httpClient.get<HelloModel>(this.path);
  }

  getGreetingAsPromise(): Promise<HelloModel> {
    return this.httpClient.get<HelloModel>(this.path).toPromise();
  }
}
