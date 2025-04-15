import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LineitemService } from '../../../service/lineitem.service';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Request } from '../../../model/request';
import { RequestService } from '../../../service/request.service';

@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css'
})
export class LineitemCreateComponent implements OnInit, OnDestroy {
  title: string = 'Line Item Create';
  newLineitem: Lineitem = new Lineitem();
  products: Product[] = new Array<Product>();
  subscription!: Subscription;
  request!: Request;

  constructor(
    private lineitemSvc: LineitemService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private productSvc: ProductService,
    private requestSvc: RequestService
  ) { }

  ngOnInit(): void {
    this.newLineitem.request.id = this.actRoute.snapshot.params['id'];
    this.subscription = this.productSvc.list().subscribe((resp) => {
      this.products = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  refreshLineitem(): void {
    this.subscription = this.lineitemSvc.getById(this.newLineitem.id).subscribe(
      (resp) => {
        this.newLineitem = resp;
      });
  } 
  addLineitem(): void {
    this.subscription = this.lineitemSvc.add(this.newLineitem).subscribe({
      next: () => {
        this.subscription = this.lineitemSvc.list().subscribe((resp) => {
          this.router.navigateByUrl('/lineitems/lines-for-req/' + this.newLineitem.request.id);
            });
      },
  });
}
}
