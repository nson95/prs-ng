import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDTO } from '../../../model/userDTO';
import { UserService } from '../../../service/user.service';
import { Router } from '@angular/router';
import { User } from '../../../model/user';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-user-login',
  standalone: false,
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit, OnDestroy {
  title='Login';
  subscription!: Subscription;
  userDTO: UserDTO = new UserDTO();
  user!: User;
  message: string = "";

  constructor(private userSvc: UserService, private router: Router, private sysSvc: SystemService) { }
  
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  login() {
    this.subscription = this.userSvc.login(this.userDTO).subscribe({
      next: (resp) => {

        this.sysSvc.loggedInUser = resp;
        console.log("Login successful: "+resp);
        this.router.navigateByUrl("/user-list");
        // redirect to home page or dashboard
      },
      error: (err) => {
        this.message = "Error logging in incorrect username or password: ";
      }

  });
  }
}
