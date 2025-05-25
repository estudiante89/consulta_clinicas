export class CreatePrescriptionDto {
  date: Date;
  medication: string;
  dosage: string;
  frequency: string;
  instructions?: string;
  validUntil?: Date;
  isDigital: boolean;
  digitalSignature?: string;
  patientId: string;
  professionalId: string;
  medicalRecordId?: string;
}