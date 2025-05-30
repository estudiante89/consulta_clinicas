import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppointmentsService {
  private api = 'http://localhost:3000/appointments';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.api, data);
  }

  findByPatient(patientId: string) {
    return this.http.get(`${this.api}/patient/${patientId}`);
  }

  cancel(id: string) {
    return this.http.patch(`${this.api}/${id}/cancel`, {});
  }
}
