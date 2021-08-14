import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SpinnerComponent>) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }
}
