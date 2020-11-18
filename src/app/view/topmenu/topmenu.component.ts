import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})

export class TopmenuComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  @Output() public sidenavToggle = new EventEmitter()

  /* Component constructor */
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startVariables()
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  /* Method in charge of closing session */
  logOut() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

}
