import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PermissionDTO} from "../../../generated/model";

@Injectable({
  providedIn: 'root'
})
export class PermissionsApiService {
  private static baseApiPath = "/api/permissions/"

  constructor(private httpclient: HttpClient) {
  }

  public getPermissions(): Observable<PermissionDTO[]> {
    return this.httpclient.get<PermissionDTO[]>(PermissionsApiService.baseApiPath);
  }
}
