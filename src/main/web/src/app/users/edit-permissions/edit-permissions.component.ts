import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PermissionDTO, UserDTO} from "../../../generated/model";
import {UsersApiService} from "../api-service/users-api.service";
import {PermissionsApiService} from "../api-service/permissions-api.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

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
              private permissionsApiService: PermissionsApiService,
              public dialogRef: MatDialogRef<EditPermissionsComponent>) {
    this.user = user;
  }

  ngOnInit(): void {
    this.permissionsApiService.getPermissions().subscribe(result => {
      this.permissions = result;
    })
  }

  changeCheckbox(event: MatCheckboxChange) {
    if (event.checked) {
      let permission = this.permissions.find(perm => perm.id.toString() === event.source.id)
      this.user.permissions.push(permission);
    } else {
      this.user.permissions = this.user.permissions.filter((perm, index, array) => {
          return perm.id.toString() != event.source.id;
        }
      )
    }
  }

  isPermissionEnabled(id: Number): boolean {
    return this.user.permissions.find(perm => perm.id === id) != null;
  }

  updateUserPermissions() {
    this.usersApiService.updateUserPermissions(this.user).subscribe(() => {
        this.dialogRef.close(true)
      },
      () =>
        this.dialogRef.close(false)
    );
  }
}
