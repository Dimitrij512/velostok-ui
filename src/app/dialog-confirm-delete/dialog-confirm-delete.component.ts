import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['./dialog-confirm-delete.component.css']
})
export class DialogConfirmDeleteComponent implements OnInit {

  constructor(public dialogConfirm: MatDialogRef<DialogConfirmDeleteComponent>) { }

  ngOnInit() {
  }

  cancelRemove(): void {
    this.dialogConfirm.close('cancel');
  }

  confirmRemove(): void {
    this.dialogConfirm.close('confirm');
  }

}
