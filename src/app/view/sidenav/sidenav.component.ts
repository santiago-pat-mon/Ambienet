import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  ls: SecureLS
  rol: string

  constructor() { }

  ngOnInit(): void {
    this.startVariables()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

}
