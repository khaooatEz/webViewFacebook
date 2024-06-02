import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface form_detail {
  typeChair: string;
  chair: string;
  payMent: string;
  psid: string; // เพิ่ม psid ใน interface
}

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.css']
})
export class DialogMovieComponent implements OnInit {

  formDetail: form_detail = {
    typeChair: '',
    chair: '',
    payMent: '',
    psid: '' // เพิ่ม psid ใน formDetail
  };

  formInvalid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit() {
    const psid = this.data.psid;
    if (psid) {
      this.formDetail.psid = psid; // ตั้งค่า psid ลงใน formDetail
    }
  }

  onSubmit() {
    console.log("onSubmit called");
    if (this.checkFormInvalid()) {
      this.formInvalid = true;
      console.log("Form is invalid");
      return;
    } else {
      let data = {
        picture: this.data.picture,
        nameMovie: this.data.nameMovie,
        typeChair: this.formDetail.typeChair,
        chair: this.formDetail.chair,
        payMent: this.formDetail.payMent,
        psid: this.formDetail.psid // ส่ง psid ใน request
      };

      // ส่งข้อมูลกลับไปยังเซิร์ฟเวอร์
      this.http.post('https://your-ngrok-url.ngrok-free.app/optionspostback', data).subscribe(
        response => {
          console.log('Booking information sent successfully', response);
          // Use Messenger API to send a message back to the user
          this.sendConfirmationMessage(this.formDetail.psid, 'เสร็จสิ้นการจอง').subscribe(
            res => {
              console.log('Confirmation message sent successfully', res);
              window.close(); // Close the window
            },
            err => {
              console.error('Error sending confirmation message', err);
              window.close(); // Close the window even if there is an error
            }
          );
        },
        error => {
          console.error('Error sending booking information', error);
        }
      );
    }
  }

  checkFormInvalid(): boolean {
    return (
      (this.formDetail.typeChair?.trim() === '' || this.formDetail.typeChair == null) ||
      (this.formDetail.chair?.trim() === '' || this.formDetail.chair == null) ||
      (this.formDetail.payMent?.trim() === '' || this.formDetail.payMent == null)
    );
  }

  sendConfirmationMessage(psid: string, message: string) {
    const PAGE_ACCESS_TOKEN = 'EAAGrx9Dtmf4BOw9EirXaW2t4xeZB8MaiTUZBU7d7COdeGTp8pZCMSsxdaKY6e2NUhKlST9i7ZBNQDRKRWz83F9kvfGfUeGQ2sLvR6mk5bKbTX6NWN5ShCowkcbBKOJk6JXBZCrrrZCTZCZBUiALwQqPWpYKBRrgV4FP8OczjPZBYlFZAcffH23HOSUdHiYyx2M7NK4ygZDZD';
    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    const body = {
      recipient: { id: psid },
      message: { text: message }
    };

    console.log('Sending confirmation message with payload:', body); // Log payload for debugging
    return this.http.post(url, body);
  }
}
