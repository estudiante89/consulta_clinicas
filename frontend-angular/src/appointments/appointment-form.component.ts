@Component({
  selector: 'app-appointment-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="doctor" placeholder="ID del Doctor" />
      <input type="datetime-local" formControlName="date" />
      <select formControlName="modality">
        <option value="presencial">Presencial</option>
        <option value="remota">Remota</option>
      </select>
      <input formControlName="reason" placeholder="Motivo" />
      <button type="submit">Agendar</button>
    </form>
  `
})
export class AppointmentFormComponent {
  form = this.fb.group({
    doctor: [''],
    date: [''],
    modality: ['presencial'],
    reason: ['']
  });

  constructor(
    private fb: FormBuilder,
    private service: AppointmentsService,
    private auth: AuthService
  ) {}

  submit() {
    const patient = this.auth.currentUser$.value.userId;
    this.service.create({ ...this.form.value, patient }).subscribe();
  }
}
