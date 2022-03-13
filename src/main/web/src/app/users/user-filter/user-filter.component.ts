import {Component, EventEmitter, OnInit} from '@angular/core';
import {UserDTO, UserStatusDTO} from "../../../generated/model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-user-filter',
  templateUrl: './user-filter.component.html',
  styleUrls: ['./user-filter.component.css']
})
export class UserFilterComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  filter: UserDTO = UserFilterComponent.getEmptyUser();
  userStates: UserStatusDTO[] = Object.values(UserStatusDTO);
  searchEventEmitter: EventEmitter<UserDTO> = new EventEmitter<UserDTO>();
  formGroup: FormGroup = this.formBuilder.group(this.filter);

  submit(filter: UserDTO) {
    this.filter = filter;
    this.searchEventEmitter.emit(filter);
  }

  clear() {
    this.filter = UserFilterComponent.getEmptyUser();
    this.formGroup = this.formBuilder.group(this.filter);
  }

  public getCurrentFilter(): UserDTO {
    return this.filter;
  }

  private static getEmptyUser(): UserDTO {
    return {
      email: null,
      firstName: null,
      id: null,
      lastName: null,
      permissions: [],
      status: null,
      username: null
    }
  }
}
