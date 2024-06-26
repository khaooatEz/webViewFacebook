import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface form_detail {
  typeChair: string;
  chair: string;
  payMent: string;
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
  };

  formInvalid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  ngOnInit() {
    console.log("PSID received from data:", this.data.psid);
  }

  onSubmit() {
    console.log("onSubmit called");
    if (this.checkFormInvalid()) {
      this.formInvalid = true;
      console.log("Form is invalid");
      return;
    } else {
      let data = {
        nameMovie: this.data.nameMovie,
        typeChair: this.formDetail.typeChair,
        chair: this.formDetail.chair,
        payMent: this.formDetail.payMent,
        psid: this.data.psid
      };

      console.log("Submitting data:", data);

      this.http.post('https://d548-171-103-249-230.ngrok-free.app/optionspostback', data).subscribe(
        response => {
          console.log('Booking information sent successfully', response);
          this.sendConfirmationMessage(this.data.psid, 'ขอบคุณที่ใช้บริการ Movielnwza007').subscribe(
            res => {
              console.log('Confirmation message sent successfully', res);
              window.close();
            },
            err => {
              console.error('Error sending confirmation message', err);
              window.close();
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

    console.log('Sending confirmation message with payload:', body);
    return this.http.post(url, body);
  }
}
