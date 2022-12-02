import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-modalerror',
  templateUrl: './modalerror.component.html',
  styleUrls: ['./modalerror.component.scss']
})
export class ModalerrorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any, private Ref:MatDialogRef<ModalerrorComponent>) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
