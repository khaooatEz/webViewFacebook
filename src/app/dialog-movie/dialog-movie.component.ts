import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.css']
})
export class DialogMovieComponent {

  showDialog: boolean = false;
  selectedMovie: string = '';
  name: string = '';
  seats: number = 0;

  openDialog(movieName: string) {
    this.selectedMovie = movieName;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.name = ''; // Reset form data
    this.seats = 0;
  }

  submitBooking() {
    console.log('ชื่อ:', this.name);
    console.log('จำนวนที่นั่ง:', this.seats);
    // ทำการจองหนังตรงนี้
    // เมื่อจองเสร็จแล้ว ปิด dialog
    this.closeDialog();
  }
}
