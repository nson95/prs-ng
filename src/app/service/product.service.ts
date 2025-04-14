import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/api/products';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(URL + "/") as Observable<Product[]>;
  }
  get(id: number): Observable<Product> {
    return this.http.get(URL + "/" + id) as Observable<Product>;
  }
  add(product: Product): Observable<Product> {
    return this.http.post(URL, product) as Observable<Product>;
  }
  update(product: Product): Observable<Product> {
    return this.http.put(URL + "/" + product.id, product) as Observable<Product>;
  }
  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id) as Observable<Product>;
  }
}
