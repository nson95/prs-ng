import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit, OnDestroy {
  title: string = 'User Edit';
  userId!: number;
  user!: User;
  subscription!: Subscription;

  constructor(private userSvc: UserService, private router: Router, private actRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.userId = this.actRoute.snapshot.params['id'];
    this.subscription = this.userSvc.get(this.userId).subscribe((resp) => {
      this.user = resp;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  delete(id: number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        // get a user
        this.subscription = this.userSvc.get(id).subscribe((resp) => {
          this.user = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user for id: '+id);
        alert('Error deleting user for id: '+id);
      }
    });
  }
  save() {
    this.userSvc.update(this.user).subscribe({
      next: (resp) => {
        this.user = resp;
        console.log("User updated successfully: "+resp);
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log("Error updating user: "+err);
      }
    });
  }


}
