import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Router } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { SystemService } from '../../../service/system.service';
import { Subscription } from 'rxjs';
import { RequestDTO } from '../../../model/request-dto';
import { User } from '../../../model/user';
@Component({
  selector: 'app-request-create',
  standalone: false,
  templateUrl: './request-create.component.html',
  styleUrl: './request-create.component.css'
})
export class RequestCreateComponent implements OnInit, OnDestroy {
  title: string = "Create Request";
  newRequest: RequestDTO = new RequestDTO();
  subscription!: Subscription;
  loggedInUser!: User;


  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private sysSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.sysSvc.loggedInUser;
    this.newRequest.userId = this.loggedInUser.id;

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addRequest() {
    this.subscription = this.requestSvc.add(this.newRequest).subscribe((resp) => {
      this.router.navigateByUrl('/request-list');
    });

  }
}
