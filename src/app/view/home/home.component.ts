import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  size = true

  constructor(
    private router: Router,
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth <= 768) {
      this.size = false
    } else {
      if (event.target.innerWidth > 768) {
        this.size = true
      }
    }
  }

  ngOnInit(): void {
    this.startVariables()
  }

  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
  }

  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

  increase() {
    this.sidenavWidth = 16
  }
  decrease() {
    this.sidenavWidth = 4.2
  }

}
