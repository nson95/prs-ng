import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-detail',
  standalone: false,
  templateUrl: './vendor-detail.component.html',
  styleUrl: './vendor-detail.component.css'
})
export class VendorDetailComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Detail'; 
  vendor!: Vendor;
  vendorId!: number;
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService, private router: Router, private actRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.vendorId = this.actRoute.snapshot.params['id'];
    this.subscription = this.vendorSvc.get(this.vendorId).subscribe((resp) => {
      this.vendor = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  delete() {
    this.vendorSvc.delete(this.vendor.id).subscribe({
      next: (resp) => {
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
