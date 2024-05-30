import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.css']
})
export class DialogMovieComponent {

  showDialog: boolean = false;
  movieName: string = '';

  openDialog(movieName: string) {
    this.movieName = movieName;
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
  }

  submitBooking() {
    // เพิ่ม logic การจองที่นี่
    this.closeDialog();
  }
}
