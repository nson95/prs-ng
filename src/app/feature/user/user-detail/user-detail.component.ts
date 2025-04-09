import { Component } from '@angular/core';
import { User } from '../../../model/user';
import { UserService } from '../../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: false,
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  title: string = "User Detail";
  user!: User;

  constructor(private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

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
