import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Professional } from '../../professionals/entities/professional.entity';
import { StaffMember } from '../../staff/entities/staff-member.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['patient', 'professional', 'staff', 'admin'] })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Patient, { nullable: true })
  @JoinColumn()
  patient?: Patient;

  @OneToOne(() => Professional, { nullable: true })
  @JoinColumn()
  professional?: Professional;

  @OneToOne(() => StaffMember, { nullable: true })
  @JoinColumn()
  staffMember?: StaffMember;
}