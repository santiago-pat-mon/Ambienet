import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  /* Declaration of variables */
  ls: SecureLS
  rol: string
  first_name_data
  last_name_data
  currentScreenWidth: string = ""
  sidenavWidth = 4.2
  size = true

  /* Component constructor */
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

  screenWidth() {
    if (window.innerWidth <= 768) {
      this.size = false
    } else {
      if (window.innerWidth > 768) {
        this.size = true
      }
    }
  }

  ngOnInit(): void {
    this.startVariables()
    this.screenWidth()
  }

  /* Method in charge of identifying the role that is logged in */
  startVariables() {
    this.ls = new SecureLS({ encodingType: "aes" })
    this.rol = this.ls.get("isLoggedRol")
    this.first_name_data = this.ls.get("isLoggedFirstName")
    this.last_name_data = this.ls.get("isLoggedLastName")
  }

  /* Method in charge of directing users who have not registered and entered as guests */
  registerGuest() {
    window.localStorage.clear()
    this.router.navigate(["/login/"])
  }

  /* Method in charge of displaying the admin menu */
  increase() {
    this.sidenavWidth = 16
  }

  /* Method in charge of hiding the admin menu */
  decrease() {
    this.sidenavWidth = 4.2
  }

}
