import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/model/post'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-viewpost',
  templateUrl: './viewpost.component.html',
  styleUrls: ['./viewpost.component.scss']
})
export class ViewpostComponent implements OnInit {
  ls: SecureLS
  rol: string
  postDataSource
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

  constructor() { }

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

    this.setObjectDataSource()
  }

  ngAfterViewInit() {
    this.postDataSource.paginator = this.paginator
    console.log(this.postDataSource.paginator)
    console.log(this.paginator)
  }

  // set data on table
  setObjectDataSource() {
    this.postDataSource = new MatTableDataSource(this.post)
    this.ngAfterViewInit()
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

}
