export class CreateMedicalRecordDto {
  date: Date;
  diagnosis: string;
  observations?: string;
  treatment?: string;
  tests?: string[];
  patientId: string;
  professionalId: string;
  appointmentId?: string;
}