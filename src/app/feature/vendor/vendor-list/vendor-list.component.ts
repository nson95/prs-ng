import { Component } from '@angular/core';
import { Vendor } from '../../../model/vendor';
import { Subscription } from 'rxjs';
import { VendorService } from '../../../service/vendor.service';

@Component({
  selector: 'app-vendor-list',
  standalone: false,
  templateUrl: './vendor-list.component.html',
  styleUrl: './vendor-list.component.css'
})
export class VendorListComponent {
  title: string = "Vendor List";
  vendors!: Vendor[];
  subscription!: Subscription;

  constructor(private vendorSvc: VendorService) { }

  ngOnInit(): void {
    this.subscription = this.vendorSvc.list().subscribe((resp: any) => {
      this.vendors = resp;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  delete(id: number) {
    this.subscription = this.vendorSvc.delete(id).subscribe({
      next: () => {
        // refresh the movie list
        this.subscription = this.vendorSvc.list().subscribe((resp) => {
          this.vendors = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting vendor for id: '+id);
        alert('Error deleting vendor for id: '+id);
      }
    });
  }
}
