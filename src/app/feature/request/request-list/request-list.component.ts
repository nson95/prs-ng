import { Component, OnDestroy, OnInit } from '@angular/core';
import { Request } from '../../../model/request';
import { Subscription } from 'rxjs';
import { RequestService } from '../../../service/request.service';
@Component({
  selector: 'app-request-list',
  standalone: false,
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit, OnDestroy {
  title: string = 'Request List';
  requests!: Request[]; 
  subscription!: Subscription;
  request!: Request;
  
  constructor(private requestSvc: RequestService) { }
  
  ngOnInit(): void {
    this.subscription = this.requestSvc.list().subscribe((resp: any) => {
      this.requests = resp;
    });
  }
  ngOnDestroy(): void {
  }

  delete(id: number) {
    this.subscription = this.requestSvc.delete(id).subscribe({
      next: () => {
        // refresh the movie list
        this.subscription = this.requestSvc.list().subscribe((resp) => {
          this.requests = resp;
        });
      },
      error: (err) => {
        console.log('Error deleting request for id: '+id);
        alert('Error deleting request for id: '+id);
      }
    });
  }
  getLines(id: number) {

}

}