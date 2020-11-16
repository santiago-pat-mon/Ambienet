import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/model/post'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ViewpostService } from 'src/app/service/viewpost.service';
import * as SecureLS from 'secure-ls';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.scss']
})
export class ViewpostComponent implements OnInit {
  ls: SecureLS
  rol: string
  postDataSource
  errorMessage = ""
  displayedColumns = [
    "title",
    "type_catastrophe",
    "description",
    "latitude",
    "longitude",
    "created",
    "photo",
    "user",
    "delete_post",
  ]

  post = [
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf1",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
    {
      title: "sdf",
      type_catastrophe: "sdf",
      description: "sdf",
      latitude: "sdf",
      longitude: "sdf",
      created: "sdf",
      photo: "sdf",
      user: "sdf",
    },
  ]

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

  constructor(
    private viewPostService: ViewpostService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.startVariables()
    this.getPostData()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  getPostData() {
    /* SE OBTIENE LA DATA DEL SERVICIO */
    this.viewPostService.getPosts().subscribe(
      p => {
        console.log(p.results)
        this.post = p.results !== undefined ? p.results : []
      },
      e => { console.log(e), this.launchMessage(e) },
      () => {
        this.setObjectDataSource()
      }
    )
  }

  // set data on table
  setObjectDataSource() {
    this.postDataSource = new MatTableDataSource(this.post)
    this.postDataSource.paginator = this.paginator
    this.postDataSource.filterPredicate = function (
      data: Post,
      filterValue: string
    ) {
      return (
        /** replace this with the column name you want to filter */
        data.user
          .trim()
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0 ||
        data.type_catastrophe
          .trim()
          .toLocaleLowerCase()
          .indexOf(filterValue.trim().toLocaleLowerCase()) >= 0
      )
    }
  }

  applyObjectFilter(filterValue: string) {
    filterValue = filterValue.trim() // Remove whitespace
    filterValue = filterValue.toLowerCase() // MatTableDataSource defaults to lowercase matches
    this.postDataSource.filter = filterValue
  }

  deletePost(post) {

  }

  /** Launch message of the snackBar component */
  launchMessage(message: string) {
    this.errorMessage = ""
    const action = "OK"
    this.snackBar.open(message, action, {
      duration: 5000,
    })
  }

}
