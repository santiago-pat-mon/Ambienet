import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ls: SecureLS
  rol: string
  currentScreenWidth: string = ""
  sidenavWidth = 4.2

  constructor() { }

  ngOnInit(): void {
    this.startVariables()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  increase() {
    this.sidenavWidth = 16
  }
  decrease() {
    this.sidenavWidth = 4.2
  }

}
