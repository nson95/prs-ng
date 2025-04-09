import { Component } from '@angular/core';
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
export class UserEditComponent {
  title: string = 'User Edit';
  userId!: number;
  user!: User;
  subscription!: Subscription;

  constructor(private userSvc: UserService, private router: Router, private actRoute: ActivatedRoute) { }

}
