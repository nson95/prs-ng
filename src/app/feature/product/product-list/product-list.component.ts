import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../model/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../../service/product.service';
import { SystemService } from '../../../service/system.service';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy {
  title = 'Product List';
  products!: Product[];
  subscription!: Subscription;
  sortOrder: string = "asc";
  sortCriteria: string = "id";
  
  constructor(private productSvc: ProductService, private sysSvc: SystemService) { }

  ngOnInit(): void {
    this.subscription = this.productSvc.list().subscribe((resp: any) => {
      this.products = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  sortBy(column: string) {
    if (this.sortCriteria == column) {
      this.sortOrder = (this.sortOrder == 'desc') ? 'asc' : 'desc';
    }
  }
  delete(id: number) {
    this.subscription = this.productSvc.delete(id).subscribe({
      next: () => {
        // refresh the product list
        this.subscription = this.productSvc.list().subscribe((resp) => {
          this.products = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting product for id: ' + id);
        alert('Error deleting product for id: ' + id);
      }
    });
  }
}
