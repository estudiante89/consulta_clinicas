@Injectable({ providedIn: 'root' })
export class PrescriptionsService {
  private api = 'http://localhost:3000/prescriptions';

  constructor(private http: HttpClient) {}

  findByDoctor(id: string) {
    return this.http.get(`${this.api}/doctor/${id}`);
  }

  findByPatient(id: string) {
    return this.http.get(`${this.api}/patient/${id}`);
  }
}
