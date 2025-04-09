import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-user-list',
  standalone: false,
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit, OnDestroy {
  title = 'User List';
  users!: User[];
  subscription!: Subscription;
  sortOrder: string = "asc";
  sortCriteria: string = "id";


  constructor(private userSvc: UserService) { }
  
  delete(id: number) {
    this.subscription = this.userSvc.delete(id).subscribe({
      next: () => {
        // refresh the movie list
        this.subscription = this.userSvc.list().subscribe((resp) => {
          this.users = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user for id: '+id);
        alert('Error deleting user for id: '+id);
      }
    });
  }
  sortBy(column: string) {
    if (this.sortCriteria == column) {
      this.sortOrder = (this.sortOrder == 'desc') ? 'asc' : 'desc';
    }
  }
  ngOnInit(): void {
    this.subscription = this.userSvc.list().subscribe((resp: any) => {
      this.users = resp;
  });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
