import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../model/request';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from '../../service/request.service';
import { LineitemService } from '../../service/lineitem.service';
import { Lineitem } from '../../model/lineitem';

@Component({
  selector: 'app-request-detail',
  standalone: false,
  templateUrl: './request-detail.component.html',
  styleUrl: './request-detail.component.css'
})
export class RequestDetailComponent implements OnInit, OnDestroy {
  title: string = 'Request Detail';
  request!: Request;
  requestId!: number;
  subscription!: Subscription;
  lineitems: Lineitem[] = new Array<Lineitem>(); 
  

  constructor(
    private requestSvc: RequestService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private lineitemSvc: LineitemService
  ) { } 
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
  
}
