import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { NotificationService } from '../../services/notification.service';
import { MetadataNotification } from '../../models/metadata.notification';
import { NotificationQueryDTO } from '../../models/notification.query';
import { NotificationFilterDTO } from '../../models/notification.filter';
import { ChannelService } from '../../services/channel.service';
import { LocalService } from '../../services/local.service';
import { Channel } from '../../models/channel';
import { Local } from '../../models/local';
import { NgForm, NgModel } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  displayedColumns = ['title', 'channel', 'validity', 'local', 'enabled'];
  dataSource: NotificationQueryDTO[];
  data: MetadataNotification;
  localIds: number[] = [];
  channelIds: number[] = [];
  length: number;
  page: number = 1;
  pageSize: number= 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  enabled: boolean = null;
  order: string = 'desc';
  field: string = 'created';
  filter: NotificationFilterDTO;
  locals: Local[];
  channels: Channel[];
  statuses: any[];
  
  constructor(public notificationService: NotificationService,
              public dialog: MatDialog,
              private localService: LocalService,
              private channelService: ChannelService,
              private toastr: ToastrService) {
        this.filter = new NotificationFilterDTO(this.localIds, this.channelIds, this.enabled, this.page, this.pageSize, this.order, this.field);
        this.statuses = [
          { value: true, status: 'Habilitado' },
          { value: false, status: 'Inhabilitado' }
        ];
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadNotifications();
    this.loadChannels();
    this.loadLocals();
  }

  loadNotifications() {
    this.notificationService.getNotificationsFilter(this.filter).subscribe(
      res => {
        this.data = res;
        this.dataSource = this.data.list;
        this.length = this.data.total;
        console.log(res);
      }
    );
  }

  loadLocals() {
    this.localService.getAllLocals().subscribe(
      res => {
        this.locals = res;
      }
    );
  }

  loadChannels() {
    this.channelService.getAllChannels().subscribe(
      res => {
        this.channels = res;
      }
    );
  }

  handlePage(e: PageEvent) {
    this.page = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.filter.page = this.page;
    this.filter.max = this.pageSize;
    this.loadNotifications();
  }

  selectAll(checkAll, select: NgModel, values) {
    if(checkAll){
      select.update.emit(values); 
    }
    else{
      select.update.emit([]);
    }
  }

  search() {
    this.filter.channels = this.channelIds ? this.channelIds : [];
    this.filter.locals = this.localIds ? this.localIds : [];
    this.filter.enabled = this.enabled;
    this.filter.page = 1;
    this.paginator.firstPage();
    this.loadNotifications();
  }

  onClean(form: NgForm) {
    form.reset();
    this.filter.channels = [];
    this.filter.locals = [];
    this.filter.enabled = null;
    this.filter.page = 1;
    this.paginator.firstPage();
    this.loadNotifications();
  }

  sortData(e) {
    this.order = e.direction;
    this.field = e.active;
    this.filter.order = this.order;
    this.filter.field = this.field;
    this.loadNotifications();
  }

}

