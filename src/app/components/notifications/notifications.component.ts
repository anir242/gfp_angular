import {Component, Input, OnInit} from '@angular/core';
import {NotificationsInterface} from '../../_models/api/notifications-interface';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notificationInterface: NotificationsInterface[];
  read = false;
  constructor() {}
  ngOnInit(): void {
    // this.getNotification().then();
  }
  getNotification = async () => {

  }
}
