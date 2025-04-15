import { Component, OnDestroy, OnInit } from '@angular/core';
import { Lineitem } from '../../../model/lineitem';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LineitemService } from '../../../service/lineitem.service';

@Component({
  selector: 'app-lineitem-create',
  standalone: false,
  templateUrl: './lineitem-create.component.html',
  styleUrl: './lineitem-create.component.css'
})
export class LineitemCreateComponent implements OnInit, OnDestroy {
  title: string = 'Line Item Create';
  newLineitem: Lineitem = new Lineitem();
  subscription!: Subscription;

  constructor(
    private lineitemSvc: LineitemService,
    private actRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.newLineitem.request.id = this.actRoute.snapshot.params['id'];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  addUser(): void {
    this.subscription = this.lineitemSvc.add(this.newLineitem).subscribe((resp) => {
          this.router.navigateByUrl('/lineitems/lines-for-req/' + this.newLineitem.request.id);
    });
  }
}
