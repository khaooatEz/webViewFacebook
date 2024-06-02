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
      this.http.post('https://bbcd-2001-fb1-c4-a1b5-612b-ba62-2e7b-12e6.ngrok-free.app/optionspostback', data).subscribe(
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
    const PAGE_ACCESS_TOKEN = 'EAAGrx9Dtmf4BOxSkwkwnLyXd5nZAIgyWEOZCPXFDBAe3LdqYCUltTlbyZCgZAEC2feYeZCVUGPYxZB24V5Y6X62BKUmIU7zONIleGDZCLYjhqZCwAVLhVa40Xy9vQ4USvZCaZCZA43H1LLZCLP0bZClEzGvTgfaJdEEEZBXnZC3OQZCxMXZAJ3YSIhW0x98s2nC5j8yh6by2nMo2j2ZAZAe8yTu3n7vxlDz1YW2Id4ZD';
    const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;
    const body = {
      recipient: { id: psid },
      message: { text: message }
    };

    console.log('Sending confirmation message with payload:', body); // Log payload for debugging
    return this.http.post(url, body);
  }
}
