import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Professional } from '../../professionals/entities/professional.entity';
import { MedicalRecord } from '../../medical-records/entities/medical-record.entity';

@Entity()
export class Prescription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column({ type: 'text' })
  medication: string;

  @Column({ type: 'text' })
  dosage: string;

  @Column({ type: 'text' })
  frequency: string;

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'date', nullable: true })
  validUntil: Date;

  @Column({ default: false })
  isDigital: boolean;

  @Column({ nullable: true })
  digitalSignature: string;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;

  @ManyToOne(() => Professional)
  @JoinColumn()
  professional: Professional;

  @ManyToOne(() => MedicalRecord, { nullable: true })
  @JoinColumn()
  medicalRecord: MedicalRecord;
}