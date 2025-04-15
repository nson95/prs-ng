import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Request } from '../model/request';
import { RequestDTO } from '../model/request-dto';

const URL = 'http://localhost:8080/api/requests';
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  list(): Observable<Request[]> {
    return this.http.get(URL +"/") as Observable<Request[]>;
  }
  get(id: number): Observable<Request> {
    return this.http.get(URL +"/" +id) as Observable<Request>;
  }
  submitReview(id: number) {
    return this.http.put(URL +"/submit-review/" +id, "") as Observable<Request>;
  }
  rejectRequest(id: number, reasonForRejection: string) {
    return this.http.put(URL +"/reject/" +id, reasonForRejection) as Observable<Request>;
  }
  approveRequest(id: number) {
    return this.http.put(URL +"/approve/" +id, "") as Observable<Request>;
  }
  add(requestDTO: RequestDTO): Observable<Request> {
    return this.http.post(URL, requestDTO) as Observable<Request>;
  }
  update(request: Request): Observable<Request> {
    return this.http.put(URL +"/" +request, request) as Observable<Request>;
  }
  delete(id: number): Observable<any> {
    return this.http.delete(URL+"/" +id) as Observable<Request>;
  }
}
