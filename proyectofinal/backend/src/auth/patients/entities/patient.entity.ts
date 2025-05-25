import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MedicalRecord } from '../../medical-records/entities/medical-record.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fullName: string;

  @Column({ unique: true })
  identityDocument: string;

  @Column()
  birthDate: Date;

  @Column()
  phoneNumber: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column({ nullable: true })
  healthCoverage: string;

  @Column({ nullable: true })
  healthCoverageNumber: string;

  @OneToMany(() => MedicalRecord, medicalRecord => medicalRecord.patient)
  medicalRecords: MedicalRecord[];

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}