import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../../../generated/model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private static baseApiPath = "/api/users/"

  constructor(private httpclient: HttpClient) { }

  public getUsers(): Observable<UserDTO[]> {
    return this.httpclient.get<UserDTO[]>(UsersApiService.baseApiPath);
  }
}
