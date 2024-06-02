import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface form_detail{
  typeChair : string,
  chair : string,
  payMent : string,
}

@Component({
  selector: 'app-dialog-movie',
  templateUrl: './dialog-movie.component.html',
  styleUrls: ['./dialog-movie.component.css']
})
export class DialogMovieComponent {

  formDetail: form_detail = {
    typeChair:'',
    chair: '',
    payMent:'',
  };

  formInvalid: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<DialogMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  onSubmit() {
    if (this.checkFormInvalid()) {
      this.formInvalid = true;
      return;
    } else {
      // ส่งข้อมูลกลับไปยัง chatbot Facebook
      let data = {
        picture: this.data.picture,
        nameMovie: this.data.nameMovie,
        typeChair: this.formDetail.typeChair,
        chair: this.formDetail.chair,
        payMent: this.formDetail.payMent
      };
      window.opener.postMessage(data, '*');
      window.close();
    }
  }

  checkFormInvalid(): boolean {
    return (
      (this.formDetail.typeChair?.trim() === '' || this.formDetail.typeChair == null) ||
      (this.formDetail.chair?.trim() === '' || this.formDetail.chair == null) ||
      (this.formDetail.payMent?.trim() === '' || this.formDetail.payMent == null)
    );
  }

}
