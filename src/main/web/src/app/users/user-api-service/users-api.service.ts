import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserDTO} from "../../../generated/model";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private static baseApiPath = "/api/users/"

  constructor(private httpclient: HttpClient) {
  }

  public getUsers(): Observable<UserDTO[]> {
    return this.httpclient.get<UserDTO[]>(UsersApiService.baseApiPath);
  }

  public createUser(user: UserDTO): Observable<UserDTO> {
    console.log("Sending request" + JSON.stringify(user));
    const headers = {'content-type': 'application/json'};

    return this.httpclient.post<UserDTO>(UsersApiService.baseApiPath,
      JSON.stringify(user),
      {'headers': headers});
  }

  public deleteUser(userId: Number): Observable<void>{
    return this.httpclient.delete<void>(UsersApiService.baseApiPath + userId);
  }

  public updateUser(user: UserDTO): Observable<UserDTO> {
    console.log("Sending request" + JSON.stringify(user));
    const headers = {'content-type': 'application/json'};

    return this.httpclient.patch<UserDTO>(UsersApiService.baseApiPath,
      JSON.stringify(user),
      {'headers': headers});
  }
}
