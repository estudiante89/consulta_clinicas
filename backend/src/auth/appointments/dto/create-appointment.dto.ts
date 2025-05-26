export class CreateAppointmentDto {
  date: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'canceled';
  type: 'in-person' | 'remote';
  reason?: string;
  notes?: string;
  patientId: string;
  professionalId: string;
  clinicId: string;
}