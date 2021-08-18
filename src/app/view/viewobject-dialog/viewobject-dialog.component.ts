import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewobject-dialog',
  templateUrl: './viewobject-dialog.component.html',
  styleUrls: ['./viewobject-dialog.component.scss']
})

export class ViewobjectDialogComponent implements OnInit {
  /* Declaration of variables */
  objectType = ""

  /* Component constructor */
  constructor(
    public dialogRef: MatDialogRef<ViewobjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public object: any
  ) { }

  ngOnInit(): void {
    console.log(this.object)
    this.objectType = this.object.type
    const object = this.object.object
    this.configObject(object)
  }

  configObject(object) {
  }

  /* Method responsible for closing the generated window */
  onNoClick(): void {
    this.dialogRef.close()
  }
}
