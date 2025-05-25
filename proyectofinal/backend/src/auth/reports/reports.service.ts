import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Patient } from '../patients/entities/patient.entity';
import { Professional } from '../professionals/entities/professional.entity';
import { Clinic } from '../clinics/entities/clinic.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async getAppointmentsReport(startDate: Date, endDate: Date): Promise<any> {
    const appointments = await this.appointmentRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
      relations: ['patient', 'professional', 'clinic'],
    });

    const stats = {
      total: appointments.length,
      byStatus: {
        scheduled: appointments.filter(a => a.status === 'scheduled').length,
        completed: appointments.filter(a => a.status === 'completed').length,
        canceled: appointments.filter(a => a.status === 'canceled').length,
      },
      byType: {
        inPerson: appointments.filter(a => a.type === 'in-person').length,
        remote: appointments.filter(a => a.type === 'remote').length,
      },
    };

    return { appointments, stats };
  }

  async getPatientsReport(): Promise<any> {
    const patients = await this.patientRepository.find();
    
    const ageGroups = {
      '0-18': 0,
      '19-30': 0,
      '31-45': 0,
      '46-60': 0,
      '61+': 0,
    };

    const today = new Date();
    patients.forEach(patient => {
      const birthDate = new Date(patient.birthDate);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age <= 18) ageGroups['0-18']++;
      else if (age <= 30) ageGroups['19-30']++;
      else if (age <= 45) ageGroups['31-45']++;
      else if (age <= 60) ageGroups['46-60']++;
      else ageGroups['61+']++;
    });

    return { total: patients.length, ageGroups };
  }

  async getProfessionalsReport(): Promise<any> {
    const professionals = await this.professionalRepository.find({
      relations: ['specialties'],
    });

    const specialtiesMap = new Map<string, number>();
    professionals.forEach(professional => {
      professional.specialties.forEach(specialty => {
        const count = specialtiesMap.get(specialty.name) || 0;
        specialtiesMap.set(specialty.name, count + 1);
      });
    });

    const specialties = Array.from(specialtiesMap.entries()).map(([name, count]) => ({
      name,
      count,
    }));

    return { total: professionals.length, specialties };
  }
}