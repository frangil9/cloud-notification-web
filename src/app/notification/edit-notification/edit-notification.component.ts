import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Local } from '../../models/local';
import { Channel } from '../../models/channel';
import { NotificationDTO } from '../../models/notification-dto';
import { NotificationService } from '../../services/notification.service';
import { ChannelService } from '../../services/channel.service';
import { LocalService } from '../../services/local.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ]
})
export class EditNotificationComponent implements OnInit {

  locals: Local[];
  channels: Channel[];
  hours: string[];
  myForm: FormGroup;
  isValidFormSubmitted: boolean = null;
  id: string;
  notification: NotificationDTO;

  constructor(public dialogRef: MatDialogRef<EditNotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private adapter: DateAdapter<any>,
              private notificationService: NotificationService,
              private toastr: ToastrService,
              private localService: LocalService,
              private channelService: ChannelService,
              private formBuilder: FormBuilder) {
    this.id = data.id;
    this.createForm();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      message: ['', [
        Validators.required,
        Validators.minLength(2)
      ]
      ],
      channels: ['', [
        Validators.required
      ]
      ],
      locals: ['', [
        Validators.required,
      ]
      ],
      enabled: '',
      read: '',
      date: ['', [
        Validators.required
      ]
      ],
      hours: ['', [
        Validators.required
      ]
      ]
    });
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

  getNotification() {
    this.notificationService.getNotification(this.id).subscribe(
      res => {
        this.notification = res;
        let split = this.notification.validity.split(' ');
        let date = moment(split[0].trim(), 'DD-MM-YYYY');
        let hour = split[1].trim();
        this.myForm.patchValue({          
          title: this.notification.title,
          message: this.notification.message,
          channels: this.notification.channelIds,
          locals: this.notification.localIds,
          enabled: this.notification.enabled,
          read: this.notification.read,
          date: date,
          hours: hour
        });
      }
    );
  }

  ngOnInit() {
    this.loadChannels();
    this.loadLocals();
    this.getNotification();
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

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.isValidFormSubmitted = false;
    if (!this.myForm.valid) {
      return;
    }
    this.isValidFormSubmitted = true;
    let noti: NotificationDTO = this.mapping();
    this.notificationService.updateNotification(this.id, noti).subscribe(
      res => {
        this.toastr.success('La notificación se actualizó exitosamente');
        this.dialogRef.close();
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
    console.log(noti);
  }

  mapping(): NotificationDTO {
    let noti = new NotificationDTO();
    noti.title = this.myForm.get('title').value;
    noti.message = this.myForm.get('message').value;
    noti.enabled = this.myForm.get('enabled').value;
    noti.read = this.myForm.get('read').value;
    let date = moment(this.myForm.get('date').value).format('DD-MM-YYYY');
    let hour = this.myForm.get('hours').value;
    let srtDatetime = date + ' ' + hour;
    noti.validity = srtDatetime;
    noti.channelIds = this.myForm.get('channels').value;
    noti.localIds = this.myForm.get('locals').value;
    return noti; 
  }

}
