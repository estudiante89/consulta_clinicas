@Component({
  selector: 'app-prescriptions',
  template: `
    <div *ngFor="let p of prescriptions">
      <h3>{{ p.medication }}</h3>
      <p>{{ p.instructions }}</p>
      <small>Firmada: {{ p.digitallySigned }}</small>
    </div>
  `
})
export class PrescriptionsComponent {
  prescriptions: any[] = [];

  constructor(private service: PrescriptionsService, private auth: AuthService) {
    const id = this.auth.currentUser$.value.userId;
    const role = this.auth.currentUser$.value.role;

    if (role === 'doctor') {
      this.service.findByDoctor(id).subscribe(p => this.prescriptions = p as any[]);
    } else {
      this.service.findByPatient(id).subscribe(p => this.prescriptions = p as any[]);
    }
  }
}
