import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestLinesComponent } from './feature/request/request-lines/request-lines.component';
import { LineitemCreateComponent } from './feature/lineitem/lineitem-create/lineitem-create.component';
import { LineitemEditComponent } from './feature/lineitem/lineitem-edit/lineitem-edit.component';
import { ReviewListComponent } from './feature/review/review-list/review-list.component';
import { RequestDetailComponent } from './feature/request-detail/request-detail.component';
import { RequestReviewComponent } from './feature/request-review/request-review.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';

const URL  = 'http://localhost:8080/api/users';
const routes: Routes = [
  { path: '', redirectTo: '/user-login', pathMatch: 'full' },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-create', component: UserCreateComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'user-detail/:id', component: UserDetailComponent },
  { path: 'user-login', component: UserLoginComponent },
  { path : 'vendor-list', component: VendorListComponent},
  { path : 'vendor-detail/:id', component: VendorDetailComponent},
  { path : 'vendor-edit/:id', component: VendorEditComponent},
  { path : 'vendor-create', component: VendorCreateComponent},
  { path : 'product-list', component: ProductListComponent},
  { path : 'product-detail/:id', component: ProductDetailComponent},
  { path : 'product-edit/:id', component: ProductEditComponent},
  { path : 'product-create', component: ProductCreateComponent},
  { path : 'request-list', component: RequestListComponent},
  { path : 'request-create', component: RequestCreateComponent},
  { path : 'request-detail/:id', component: RequestDetailComponent},
  { path : 'request-review/:id', component: RequestReviewComponent},
  { path : 'lineitems/lines-for-req/:id', component: RequestLinesComponent},
  { path: 'lineitem-create/:id', component: LineitemCreateComponent },
  { path: 'lineitem-edit/:id', component: LineitemEditComponent },
  { path: 'review-list', component: ReviewListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
