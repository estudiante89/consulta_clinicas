@Component({
  selector: 'app-analytics',
  template: `
    <h3>Pacientes por Doctor</h3>
    <ul>
      <li *ngFor="let p of patients">{{ p.doctor }} - {{ p.total }}</li>
    </ul>

    <h3>Citas por modalidad</h3>
    <ul>
      <li *ngFor="let m of modalities">{{ m._id }}: {{ m.total }}</li>
    </ul>
  `
})
export class AnalyticsComponent {
  patients: any[] = [];
  modalities: any[] = [];

  constructor(private service: AnalyticsService) {
    this.service.patientsPerDoctor().subscribe(p => this.patients = p as any[]);
    this.service.modalityStats().subscribe(m => this.modalities = m as any[]);
  }
}
