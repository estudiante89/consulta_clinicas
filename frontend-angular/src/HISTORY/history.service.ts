@Injectable({ providedIn: 'root' })
export class HistoryService {
  private api = 'http://localhost:3000/medical-history';

  constructor(private http: HttpClient) {}

  create(data: any) {
    return this.http.post(this.api, data);
  }

  findByPatient(id: string) {
    return this.http.get(`${this.api}/patient/${id}`);
  }

  findByDoctor(id: string) {
    return this.http.get(`${this.api}/doctor/${id}`);
  }
}
