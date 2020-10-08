import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss']
})

export class TopmenuComponent implements OnInit {
  ls: SecureLS
  rol: string
  @Output() public sidenavToggle = new EventEmitter()
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.startVariables()
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  logOut() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

}
