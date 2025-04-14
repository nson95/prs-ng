import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Vendor } from '../../../model/vendor';
import { Router } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-create',
  standalone: false,
  templateUrl: './vendor-create.component.html',
  styleUrl: './vendor-create.component.css'
})
export class VendorCreateComponent {
  title: string = 'Vendor Create';
  newVendor: Vendor = new Vendor();
  subscription!: Subscription;

  constructor(
    private vendorSvc: VendorService,
    private router: Router
  ) { } 

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addVendor(): void {
    this.subscription = this.vendorSvc.add(this.newVendor).subscribe((resp) => {
      this.router.navigateByUrl('/vendor-list');
    });
  }
}
