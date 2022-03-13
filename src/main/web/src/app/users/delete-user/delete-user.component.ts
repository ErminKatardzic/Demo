import {Component, Inject, OnInit} from '@angular/core';
import {UserDTO} from "../../../generated/model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersApiService} from "../api-service/users-api.service";

@Component({
  selector: 'app-user-delete-confirmation',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  user: UserDTO;

  constructor(@Inject(MAT_DIALOG_DATA) user: UserDTO,
              private apiService: UsersApiService,
              public dialogRef: MatDialogRef<DeleteUserComponent>) {
    this.user = user;
  }

  ngOnInit(): void {
  }

  deleteUser(): void {
    this.apiService.deleteUser(this.user.id).subscribe(() => {
        this.dialogRef.close(true)
      },
      () => {
        this.dialogRef.close(false);
      }
    );
  }
}
