import { Component, OnInit } from '@angular/core';
import { ActiveUserService } from '../active-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   
  constructor(private activeUser: ActiveUserService, public router: Router) { }
  
  active = this.activeUser.getActive();

  logout() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
