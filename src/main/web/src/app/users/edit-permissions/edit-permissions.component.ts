import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {PermissionDTO, UserDTO} from "../../../generated/model";
import {UsersApiService} from "../api-service/users-api.service";
import {PermissionsApiService} from "../api-service/permissions-api.service";

@Component({
  selector: 'app-edit-permissions',
  templateUrl: './edit-permissions.component.html',
  styleUrls: ['./edit-permissions.component.css']
})
export class EditPermissionsComponent implements OnInit {
  user: UserDTO;
  permissions: PermissionDTO[] = null;

  constructor(@Inject(MAT_DIALOG_DATA) user: UserDTO,
              private usersApiService: UsersApiService,
              private permissionsApiService: PermissionsApiService) {
    this.user = user;
  }

  ngOnInit(): void {
    console.log(this.user);
    this.permissionsApiService.getPermissions().subscribe(result => {
      this.permissions = result;
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  changeCheckbox(event: any) {
    console.log(event);
  }

  isPermissionEnabled(id: Number): boolean {
    this.user.permissions.forEach(perm => {
      if (perm.id == id)
        console.log("it is enabled " + id);
      return true;
    })

    console.log("it isn't enabled " + id);
    return false;
  }
}
