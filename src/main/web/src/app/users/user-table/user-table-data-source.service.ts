import {Injectable} from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {UserDTO} from "../../../generated/model";
import {BehaviorSubject, Observable} from "rxjs";
import {UsersApiService} from "../user-api-service/users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UserTableDataSourceService implements DataSource<UserDTO> {
  private data = new BehaviorSubject<UserDTO[]>([]);

  constructor(private apiService: UsersApiService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<UserDTO[] | ReadonlyArray<UserDTO>> {
    this.refreshData()
    return this.data;
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  refreshData() {
    this.apiService.getUsers().subscribe(users =>
      this.data.next(users)
    );
  }
}
