import { Component } from '@angular/core';
import { MenuItem } from '../../model/menu-item';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  title: string = "Menu";
  menuItems: MenuItem[] = [];


  ngOnInit(): void {
    this.menuItems = [
      new MenuItem("User", "/user-list", "List of Users"),
      new MenuItem("Vendor", "/vendor-list", "List of Vendors")
    ];

}
}
