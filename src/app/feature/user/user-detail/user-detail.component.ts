import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnDestroy {
  title: string = "User Detail";
  user!: User;
  userId!: number;
  subscription!: Subscription;

  constructor(private userSvc: UserService, private router: Router, private actRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.userId = this.actRoute.snapshot.params['id'];
    this.subscription = this.userSvc.get(this.userId).subscribe((resp) => {
      this.user = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  delete() {
    this.userSvc.delete(this.user.id).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/user-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  
}
