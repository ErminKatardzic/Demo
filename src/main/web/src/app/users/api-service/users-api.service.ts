import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PagedUserList, UserDTO, UserFilter} from "../../../generated/model";
import {nestedToPrefixedShallow} from "../../util/nested-http-flat";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private static baseApiPath = "/api/users/"

  constructor(private httpclient: HttpClient) {
  }

  public searchUsers(userFilter: UserFilter): Observable<PagedUserList> {
    const httpParams = new HttpParams({fromObject: nestedToPrefixedShallow(userFilter)});
    return this.httpclient.get<PagedUserList>(UsersApiService.baseApiPath, {params: httpParams});
  }

  public createUser(user: UserDTO): Observable<UserDTO> {
    console.log("Sending request" + JSON.stringify(user));
    const headers = {'content-type': 'application/json'};

    return this.httpclient.post<UserDTO>(UsersApiService.baseApiPath,
      JSON.stringify(user),
      {'headers': headers});
  }

  public deleteUser(userId: Number): Observable<void> {
    return this.httpclient.delete<void>(`${UsersApiService.baseApiPath}${userId}`);
  }

  public updateUser(user: UserDTO): Observable<UserDTO> {
    const headers = {'content-type': 'application/json'};

    return this.httpclient.patch<UserDTO>(UsersApiService.baseApiPath,
      JSON.stringify(user),
      {'headers': headers});
  }

  public updateUserPermissions(user: UserDTO): Observable<void> {
    const headers = {'content-type': 'application/json'};

    return this.httpclient.patch<void>(`${UsersApiService.baseApiPath}${user.id}/permissions`,
      JSON.stringify(user.permissions),
      {'headers': headers}
    );
  }
}
