import {Injectable} from '@angular/core';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Direction, FilterPage, FilterSort, PagedUserList, UserDTO, UserFilter} from "../../../generated/model";
import {BehaviorSubject, Observable} from "rxjs";
import {UsersApiService} from "../api-service/users-api.service";
import {MatPaginator} from "@angular/material/paginator";
import {UserFilterComponent} from "../user-filter/user-filter.component";
import {merge} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserTableDataSourceService implements DataSource<UserDTO> {
  private data = new BehaviorSubject<PagedUserList>(UserTableDataSourceService.getEmptyPagedUserList());
  private paginator: MatPaginator;
  private sort: MatSort;
  private filter: UserFilterComponent;

  constructor(private apiService: UsersApiService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<UserDTO[] | ReadonlyArray<UserDTO>> {
    this.refreshData()
    this.fetchOnChange();

    return this.data.pipe(map(pagedUserList => pagedUserList.content));
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  refreshData() {
    const filterPage: FilterPage = {page: this.paginator.pageIndex, size: this.paginator.pageSize};
    const filterSort: FilterSort = {
      fieldName: this.sort.active,
      direction: this.sort.direction === "asc" ? Direction.ASC : Direction.DESC
    }

    const searchCriteria: UserFilter = {
      userFilterCriteria: this.filter.getCurrentFilter(),
      filterPage: filterPage,
      filterSort: filterSort
    }

    this.apiService.searchUsers(searchCriteria).subscribe(users =>
      {
        this.data.next(users)
      }
    );
  }

  private fetchOnChange() {
    merge(this.paginator.page, this.sort.sortChange).subscribe(() => {
      this.refreshData();
    });

    this.filter.searchEventEmitter.subscribe(() => {
      if (this.paginator.pageIndex === 0) {
        this.refreshData();
      } else {
        this.paginator.firstPage();
      }
    });
  }

  public getNumberOfElements(): Number {
    return this.data?.getValue().totalElements;
  }

  public setPaginator(paginator: MatPaginator) {
    this.paginator = paginator;
  }

  public setFilter(filter: UserFilterComponent) {
    this.filter = filter;
  }

  public setSort(sort: MatSort) {
    this.sort = sort;
  }

  public static getEmptyPagedUserList(): PagedUserList{
    return {
      content: [],
      totalElements: 0,
      totalPages: 0
    };
  }
}
