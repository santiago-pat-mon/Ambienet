import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-viewobject-dialog',
  templateUrl: './viewobject-dialog.component.html',
  styleUrls: ['./viewobject-dialog.component.scss']
})
export class ViewobjectDialogComponent implements OnInit {

  objectType = ""

  constructor(
    public dialogRef: MatDialogRef<ViewobjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public object: any
  ) { }

  ngOnInit(): void {
    this.objectType = this.object.type
    const object = this.object.object
    this.configObject(object)
  }

  configObject(object) {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
