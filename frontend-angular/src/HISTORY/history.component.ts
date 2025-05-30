@Component({
  selector: 'app-history',
  template: `
    <div *ngIf="records.length">
      <div *ngFor="let h of records">
        <h3>{{ h.diagnosis }}</h3>
        <p>{{ h.treatment }}</p>
        <small>{{ h.createdAt | date }}</small>
      </div>
    </div>
  `
})
export class HistoryComponent {
  records: any[] = [];
  user = this.auth.currentUser$.value;

  constructor(private service: HistoryService, private auth: AuthService) {
    const id = this.user.userId;
    if (this.user.role === 'doctor') {
      this.service.findByDoctor(id).subscribe(r => this.records = r as any[]);
    } else {
      this.service.findByPatient(id).subscribe(r => this.records = r as any[]);
    }
  }
}
