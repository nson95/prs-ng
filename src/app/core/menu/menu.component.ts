import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../../model/menu-item';
import { User } from '../../model/user';
import { SystemService } from '../../service/system.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  title: string = "Menu";
  menuItems: MenuItem[] = [];
  loggedinUser!: User;
  welcomeMsg = "";

  constructor(private sysSvc: SystemService) { }



  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("User", "/user-list", "List of Users"),
      new MenuItem("Vendor", "/vendor-list", "List of Vendors"),
      new MenuItem("Request", "/request-list", "List of Requests"),
      new MenuItem("Product", "/product-list", "List of Products"),
      new MenuItem("Review", "/review-list", "Requests for Review")
    ];
    this.loggedinUser = this.sysSvc.loggedInUser;
    this.sysSvc.checkLogin();
    this.welcomeMsg = "Welcome " + this.loggedinUser.firstName + " " + this.loggedinUser.lastName;
}

  logout(): void {
    this.sysSvc.logout();
  }
}
