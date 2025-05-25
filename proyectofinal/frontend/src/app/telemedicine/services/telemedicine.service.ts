import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TelemedicineService {
  private apiUrl = `${environment.apiUrl}/telemedicine`;

  constructor(private http: HttpClient) { }

  initiateSession(appointmentId: string): Promise<{ sessionId: string, token: string }> {
    return this.http.post<{ sessionId: string, token: string }>(
      `${this.apiUrl}/initiate`, 
      { appointmentId }
    ).toPromise();
  }

  endSession(sessionId: string): Promise<void> {
    return this.http.post<void>(
      `${this.apiUrl}/end`, 
      { sessionId }
    ).toPromise();
  }

  getSessionInfo(sessionId: string): Promise<any> {
    return this.http.get<any>(
      `${this.apiUrl}/session/${sessionId}`
    ).toPromise();
  }
}