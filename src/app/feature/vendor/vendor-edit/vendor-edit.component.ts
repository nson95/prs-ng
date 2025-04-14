import { Component, OnDestroy, OnInit } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-edit',
  standalone: false,
  templateUrl: './vendor-edit.component.html',
  styleUrl: './vendor-edit.component.css'
})
export class VendorEditComponent implements OnInit, OnDestroy {
  title: string = 'Vendor Edit';
  vendorId!: number;
  vendor!: Vendor;
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
  delete(id: number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        // get a user
        this.subscription = this.vendorSvc.get(id).subscribe((resp) => {
          this.vendor = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting user for id: '+id);
        alert('Error deleting user for id: '+id);
      }
    });
  }
  save() {
    this.vendorSvc.update(this.vendor).subscribe({
      next: (resp) => {
        this.vendor = resp;
        console.log("Vendor updated successfully: "+resp);
        this.router.navigateByUrl('/vendor-list');
      },
      error: (err) => {
        console.log("Error updating vendor: "+err);
      }
    });
  }
}
