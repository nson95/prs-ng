import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { ActivatedRoute, Router } from '@angular/router';
import { LineitemService } from '../../../service/lineitem.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-lineitem-edit',
  standalone: false,
  templateUrl: './lineitem-edit.component.html',
  styleUrl: './lineitem-edit.component.css'
})
export class LineitemEditComponent implements OnInit, OnDestroy {
  title: string = 'Line Item Edit';
  lineitemId!: number;
  lineitem!: Lineitem;
  subscription!: Subscription;
  products: Product[] = new Array<Product>();


  constructor
  (
    private lineitemSvc: LineitemService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private productSvc: ProductService
  ) { }

  ngOnInit(): void {
    this.lineitemId = this.actRoute.snapshot.params['id'];
    this.subscription = this.lineitemSvc.getById(this.lineitemId).subscribe(
      (resp) => {
        this.lineitem = resp;
      });
    this.productSvc.list().subscribe(
      (resp) => {
        this.products = resp;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save(): void {
    this.lineitemSvc.update(this.lineitem).subscribe(
      (resp) => {
        this.router.navigate(['/lineitems/lines-for-req/' + this.lineitem.request.id]);
      });
  }
}
