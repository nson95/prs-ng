import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lineitem } from '../model/lineitem';
import { Observable } from 'rxjs';

const URL = 'http://localhost:8080/api/lineitems';Lineitem
@Injectable({
  providedIn: 'root'
})
export class LineitemService {
  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(URL + "/") as Observable<Lineitem[]>;
  }
  getById(id: number): Observable<Lineitem> {
    return this.http.get(URL + "/" + id) as Observable<Lineitem>;
  }
  getReqLines(reqId: number): Observable<Lineitem[]> {
    return this.http.get(URL + "/lines-for-req/" + reqId) as Observable<Lineitem[]>;
  }
  add(lineitem: Lineitem): Observable<Lineitem> {
    return this.http.post(URL, lineitem) as Observable<Lineitem>;
  }
  update(lineitem: Lineitem): Observable<Lineitem> {
    return this.http.put(URL + "/" + lineitem.id, lineitem) as Observable<Lineitem>;
  }
  delete(id: number): Observable<any> {
    return this.http.delete(URL + "/" + id) as Observable<Lineitem>;
  }
}
