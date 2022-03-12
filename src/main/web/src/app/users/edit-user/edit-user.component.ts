import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserDTO, UserStatusDTO} from "../../../generated/model";
import {UsersApiService} from "../api-service/users-api.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: UserDTO;
  userStates: UserStatusDTO[];

  constructor(@Inject(MAT_DIALOG_DATA) user: UserDTO,
              private apiService: UsersApiService,
              public dialogRef: MatDialogRef<EditUserComponent>) {
    this.user = user;
    this.userStates= Object.values(UserStatusDTO);
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    this.apiService.updateUser(this.user).subscribe(() => {
        this.dialogRef.close(true)
      },
      () =>
        this.dialogRef.close(false)
    );
  }
}
