import {Component, OnInit} from '@angular/core';
import {UsersApiService} from "../user-api-service/users-api.service";
import {UserDTO, UserStatusDTO} from "../../../generated/model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  request: UserDTO = this.getEmptyUserDTO();

  constructor(private apiService: UsersApiService,
              public dialogRef: MatDialogRef<CreateUserComponent>) {
  }

  ngOnInit(): void {
  }

  createUser() {
    console.log(this.request);
    this.apiService.createUser(this.request).subscribe(result => {
        if (result != null) {
          this.dialogRef.close(true);
        }
      }, err => {
        this.dialogRef.close(false);
      }
    );
  }

  getEmptyUserDTO(): UserDTO {
    return {
      id: null,
      email: null,
      firstName: null,
      lastName: null,
      username: null,
      status: UserStatusDTO.INACTIVE
    };
  }
}
