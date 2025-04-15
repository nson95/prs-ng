import { Component } from '@angular/core';
import { Request } from '../../../model/request';
import { User } from '../../../model/user';
import { Subscription } from 'rxjs';
import { SystemService } from '../../../service/system.service';
import { Router } from '@angular/router';
import { RequestService } from '../../../service/request.service';
@Component({
  selector: 'app-review-list',
  standalone: false,
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css'
})
export class ReviewListComponent {
  title: string = "Review List";
  requestsForReview: Request[] = new Array<Request>();
  loggedInUser!: User;
  subscription!: Subscription;

  constructor(
    private requestSvc: RequestService,
    private sysSvc: SystemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.subscription = this.requestSvc.list().subscribe(
      (resp) => {
        this.requestsForReview = resp;
      });
  }
}
