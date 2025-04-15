import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../model/product';
import { Vendor } from '../../../model/vendor';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-edit',
  standalone: false,
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.css'
})
export class ProductEditComponent implements OnInit, OnDestroy {
  title: string = 'Product Edit';
  productId!: number;
  product!: Product;
  subscription!: Subscription;
  vendors: Vendor[] = new Array<Vendor>();

  constructor(
    private productSvc: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private vendorSvc: VendorService
  ) { }

  ngOnInit(): void {
    this.subscription = this.actRoute.params.subscribe((params) => {
      this.productId = params['id'];
      this.subscription = this.productSvc.get(this.productId).subscribe((resp) => {
        this.product = resp;
      });
      this.subscription = this.vendorSvc.list().subscribe((resp: any) => {
        this.vendors = resp;
      });
    });

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete(): void {
    this.subscription = this.productSvc.delete(this.productId).subscribe(
      (resp) => {
        this.router.navigate(['/product-list']);
      }
    ); 
}
  save(): void {
    this.subscription = this.productSvc.update(this.product).subscribe(
      (resp) => {
        this.router.navigate(['/product-list']);
      }
    );  
  }
}
