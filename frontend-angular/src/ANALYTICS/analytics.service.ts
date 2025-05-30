@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private api = 'http://localhost:3000/analytics';

  constructor(private http: HttpClient) {}

  patientsPerDoctor() {
    return this.http.get(`${this.api}/patients-per-doctor`);
  }

  modalityStats() {
    return this.http.get(`${this.api}/appointments-by-modality`);
  }

  historyMonthly(year: number) {
    return this.http.get(`${this.api}/history-per-month/${year}`);
  }
}
