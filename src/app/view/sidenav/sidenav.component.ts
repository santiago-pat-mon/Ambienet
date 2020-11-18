import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string

  /* Component constructor */
  constructor() { }

  ngOnInit(): void {
    this.startVariables()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

}
