import { Component } from '@angular/core';
import { Product } from '../../../model/product';
import { ProductService } from '../../../service/product.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-product-create',
  standalone: false,
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {
  title: string = 'Product Create';
  newProduct: Product = new Product();
  subscription!: Subscription;
  vendors: Vendor[] = new Array<Vendor>();

  constructor(
    private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
  ) { }
  

  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe((resp: any) => {
      this.vendors = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addProduct(): void {
    this.subscription = this.productSvc.add(this.newProduct).subscribe((resp) => {
          this.router.navigateByUrl('/product-list');
    });
  }
}