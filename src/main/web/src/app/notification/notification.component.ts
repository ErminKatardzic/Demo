import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {NotificationData} from "./notification-data";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  data: NotificationData;

  constructor(@Inject(MAT_DIALOG_DATA) data: NotificationData) {
    this.data = data;
  }

  ngOnInit(): void {
  }
}
