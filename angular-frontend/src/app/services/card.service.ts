import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CardService {
  private baseUrl = 'http://localhost:8080/api/cards';

  constructor(private http: HttpClient) { }

  createCard(card: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, card);
  }

  deleteCard(_id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${_id}`, { responseType: 'text' });
  }

  findByAddress(address: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${address}`);
  }

  getCardsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  updateCard(_id: string, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${_id}`, value);
  }
}
