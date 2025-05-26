import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Professional } from '../../professionals/entities/professional.entity';
import { Clinic } from '../../clinics/entities/clinic.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  duration: number; // in minutes

  @Column({ type: 'enum', enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' })
  status: string;

  @Column({ type: 'enum', enum: ['in-person', 'remote'] })
  type: string;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => Patient)
  @JoinColumn()
  patient: Patient;

  @ManyToOne(() => Professional)
  @JoinColumn()
  professional: Professional;

  @ManyToOne(() => Clinic)
  @JoinColumn()
  clinic: Clinic;
}