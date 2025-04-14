import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './core/menu/menu.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { SortPipe } from './pipe/sort.pipe';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { RequestLinesComponent } from './feature/request/request-lines/request-lines.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    NotFoundComponent,
    UserListComponent,
    UserCreateComponent,
    UserDetailComponent,
    UserEditComponent,
    UserLoginComponent,
    VendorListComponent,
    RequestListComponent,
    SortPipe,
    VendorEditComponent,
    VendorCreateComponent,
    VendorDetailComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductDetailComponent,
    RequestLinesComponent,
    RequestCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }
