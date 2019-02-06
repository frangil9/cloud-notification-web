import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { NotificationService } from '../../services/notification.service';
import { ChannelService } from '../../services/channel.service';
import { LocalService } from '../../services/local.service';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { EditNotificationComponent } from '../edit-notification/edit-notification.component';
import { MetadataNotificationEntityDTO } from '../../models/metadata.notifications.list';
import { Notification } from '../../models/notification';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit {

  displayedColumns = ['title', 'message', 'validity', 'enabled', 'actions'];
  dataSource: Notification[];
  data: MetadataNotificationEntityDTO;
  length: number;
  page: number = 0;
  pageSize: number= 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  order: string = 'desc';
  field: string = 'created';

  constructor(public notificationService: NotificationService,
              public dialog: MatDialog,
              private localService: LocalService,
              private channelService: ChannelService,
              private toastr: ToastrService) { }

              
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications(this.page, this.pageSize, this.order, this.field).subscribe(
      res => {
        this.data = res;
        this.dataSource = this.data.list;
        this.length = this.data.total;
        console.log(res);
      }
    );
  }

  sortData(e) {
    this.order = e.direction;
    this.field = e.active;
    this.loadNotifications();
  }

  handlePage(e: PageEvent) {
    this.page = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadNotifications();
  }

  openAddNotification(): void {
    const dialogRef = this.dialog.open(AddNotificationComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNotifications();      
    });
  }

  openEditNotification(id): void {
    const dialogRef = this.dialog.open(EditNotificationComponent, {
      width: '450px',
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadNotifications();      
    });
  }

}
