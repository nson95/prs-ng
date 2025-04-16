import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../../../service/request.service';
import { Subscription } from 'rxjs';
import { Request } from '../../../model/request';
import { Lineitem } from '../../../model/lineitem';
import { LineitemService } from '../../../service/lineitem.service';

@Component({
  selector: 'app-request-lines',
  standalone: false,
  templateUrl: './request-lines.component.html',
  styleUrl: './request-lines.component.css'
})
export class RequestLinesComponent implements OnInit, OnDestroy {
  title: string = "Request Lines";
  requestId!: number;
  request!: Request;
  subscription!: Subscription;
  lineitems: Lineitem[] = new Array<Lineitem>();

  constructor(
    private requestSvc: RequestService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private lineitemSvc: LineitemService
  ) { }

  ngOnInit(): void {
    this.requestId = this.actRoute.snapshot.params['id'];
    this.refreshLineitem();
    this.subscription = this.lineitemSvc.getReqLines(this.requestId).subscribe((resp) => {
      this.lineitems = resp;
      for (let li of this.lineitems) {
        li.lineTotal = li.quantity * li.product.price;
      }
    });
    this.subscription = this.requestSvc.get(this.requestId).subscribe((resp) => {
      this.request = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  refreshLineitem(): void {
    this.subscription = this.lineitemSvc.getReqLines(this.requestId).subscribe(
      (resp) => {
        this.lineitems = resp;
      });
  } 
  delete(id: number) {
    this.subscription = this.lineitemSvc.delete(id).subscribe({
      next: () => {
        // refresh the lineitem list
        this.subscription = this.lineitemSvc.list().subscribe((resp) => {
          this.lineitems = resp;
          for (let li of this.lineitems) {
            li.lineTotal = li.quantity * li.product.price;
            this.subscription = this.requestSvc.get(this.requestId).subscribe((resp) => {
              this.request = resp;
            });
          }
        });       
      },
      error: (err) => {
        console.log('Error deleting lineitem for id: '+id);
        alert('Error deleting lineitem for id: '+id);
      }
    });
  }
  submitRequest(): void {
  
    this.subscription = this.requestSvc.submitReview(this.request.id).subscribe((resp) => {
      this.request = resp;
      this.router.navigateByUrl('/request-detail/' + this.request.id);
    });
  }
}
