import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Local } from '../../models/local';
import { Channel } from '../../models/channel';
import { NotificationDTO } from '../../models/notification-dto';
import { NotificationService } from '../../services/notification.service';
import { LocalService } from '../../services/local.service';
import { ChannelService } from '../../services/channel.service';
import * as moment from 'moment';


@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ]
})
export class AddNotificationComponent implements OnInit {

  locals: Local[];
  channels: Channel[];
  hours: string[];
  isValidFormSubmitted = false;

  constructor(public dialogRef: MatDialogRef<AddNotificationComponent>,
              private adapter: DateAdapter<any>,
              private notificationService: NotificationService,
              private localService: LocalService,
              private channelService: ChannelService,
              private toastr: ToastrService) { }

  onClose(): void {
    this.dialogRef.close();
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

  ngOnInit() {
    this.loadChannels();
    this.loadLocals();
    this.hours = [
      "00:00",
      "01:00",
      "02:00",
      "03:00",
      "04:00",
      "05:00",
      "06:00",
      "07:00",
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ];
  }

  onSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (!form.valid) {
      return;
    }
    this.isValidFormSubmitted = true;
    let noti: NotificationDTO = this.mapping(form);
    this.notificationService.saveNotification(noti).subscribe(
      res => {
        this.toastr.success('La notificación se creó exitosamente');
        this.dialogRef.close();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  mapping(form: NgForm): NotificationDTO {
    let noti = new NotificationDTO();
    noti.title = form.controls['title'].value;
    noti.message = form.controls['message'].value;
    noti.enabled = form.controls['enabled'].value;
    noti.read = form.controls['read'].value;
    let date = moment(form.controls['date'].value).format('DD-MM-YYYY');
    let hour = form.controls['hours'].value;
    let srtDatetime = date + ' ' + hour;
    noti.validity = srtDatetime;
    noti.channelIds = form.controls['channels'].value;
    noti.localIds = form.controls['locals'].value;
    return noti; 
  }

}
