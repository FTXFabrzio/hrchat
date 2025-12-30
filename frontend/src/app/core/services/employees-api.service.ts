import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Employee } from '../models/employee.model';

export type EmployeesQuery = {
  search?: string;
  estado?: string;
  departmentId?: string;
};

@Injectable({
  providedIn: 'root',
})
export class EmployeesApiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/employees`;

  constructor(private readonly http: HttpClient) {}

  list(filters: EmployeesQuery): Observable<Employee[]> {
    let params = new HttpParams();
    if (filters.search) {
      params = params.set('search', filters.search);
    }
    if (filters.estado) {
      params = params.set('estado', filters.estado);
    }
    if (filters.departmentId) {
      params = params.set('departmentId', filters.departmentId);
    }

    return this.http.get<Employee[]>(this.baseUrl, { params });
  }

  create(payload: Partial<Employee>): Observable<Employee> {
    return this.http.post<Employee>(this.baseUrl, payload);
  }

  update(id: string, payload: Partial<Employee>): Observable<Employee> {
    return this.http.put<Employee>(`${this.baseUrl}/${id}`, payload);
  }

  remove(id: string): Observable<{ ok: boolean }> {
    return this.http.delete<{ ok: boolean }>(`${this.baseUrl}/${id}`);
  }
}

