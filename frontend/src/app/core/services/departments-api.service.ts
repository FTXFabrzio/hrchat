import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentsApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/departments`;

  constructor(private readonly http: HttpClient) {}

  list(search?: string): Observable<Department[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Department[]>(this.baseUrl, { params });
  }

  create(payload: Partial<Department>): Observable<Department> {
    return this.http.post<Department>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Department>): Observable<Department> {
    return this.http.put<Department>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.baseUrl}/${id}`);
  }
}

