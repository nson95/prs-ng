import { Component } from '@angular/core';
import { Product } from '../../../model/product';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  title: string = "Product Detail";
  product!: Product;
  productId!: number;
  subscription!: Subscription;

  constructor(private productSvc: ProductService, private router: Router, private actRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.productId = this.actRoute.snapshot.params['id'];
    this.subscription = this.productSvc.get(this.productId).subscribe((resp) => {
      this.product = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete() {
    this.productSvc.delete(this.product.id).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/product-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}