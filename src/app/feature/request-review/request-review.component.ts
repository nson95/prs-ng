import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Request } from '../../model/request';
import { Lineitem } from '../../model/lineitem';
import { ActivatedRoute, Router } from '@angular/router';
import { LineitemService } from '../../service/lineitem.service';
import { RequestService } from '../../service/request.service';

@Component({
  selector: 'app-request-review',
  standalone: false,
  templateUrl: './request-review.component.html',
  styleUrl: './request-review.component.css'
})
export class RequestReviewComponent implements OnInit, OnDestroy {
  title: string = 'Request Review';
  requestId!: number;
  request!: Request;
  subscription!: Subscription;
  lineitems: Lineitem[] = new Array<Lineitem>(); 


  constructor(
    private requestSvc: RequestService,
    private actRoute: ActivatedRoute,
    private lineitemSvc: LineitemService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe((params) => {
      this.requestId = params['id'];
      this.subscription = this.requestSvc.get(this.requestId).subscribe((resp) => {
        this.request = resp;
      });
      this.subscription = this.lineitemSvc.getReqLines(this.requestId).subscribe((resp) => {
        this.lineitems = resp;
        for (let li of this.lineitems) {
          li.lineTotal = li.quantity * li.product.price;
        }
      });
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  rejectRequest(): void {
    this.subscription = this.requestSvc.rejectRequest(this.requestId, this.request.reasonForRejection).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  approveRequest(): void {
    this.subscription = this.requestSvc.approveRequest(this.requestId).subscribe({
      next: () => {
        this.router.navigateByUrl('/request-list');
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
