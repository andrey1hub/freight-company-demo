import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ConfirmDialogData } from 'src/app/models/confirm-dialog-data.system';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

  onCancel(): void {
    this.dialogRef.close()
  }
  onOk(): void {
    this.data.handler && typeof this.data.handler === 'function' && this.data.handler() || this.dialogRef.close()
  }

}
