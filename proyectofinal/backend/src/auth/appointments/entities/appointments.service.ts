import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ProfessionalsService } from '../professionals/professionals.service';
import { PatientsService } from '../patients/patients.service';
import { ClinicsService } from '../clinics/clinics.service';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly professionalsService: ProfessionalsService,
    private readonly patientsService: PatientsService,
    private readonly clinicsService: ClinicsService,
  ) {}

  async create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { patientId, professionalId, clinicId, ...appointmentData } = createAppointmentDto;
    
    const patient = await this.patientsService.findOne(patientId);
    const professional = await this.professionalsService.findOne(professionalId);
    const clinic = await this.clinicsService.findOne(clinicId);

    const appointment = this.appointmentRepository.create({
      ...appointmentData,
      patient,
      professional,
      clinic,
    });

    return await this.appointmentRepository.save(appointment);
  }

  async findAll(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({
      relations: ['patient', 'professional', 'clinic'],
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations: ['patient', 'professional', 'clinic'],
    });
    
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    
    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.findOne(id);
    
    if (updateAppointmentDto.patientId) {
      appointment.patient = await this.patientsService.findOne(updateAppointmentDto.patientId);
    }
    
    if (updateAppointmentDto.professionalId) {
      appointment.professional = await this.professionalsService.findOne(updateAppointmentDto.professionalId);
    }
    
    if (updateAppointmentDto.clinicId) {
      appointment.clinic = await this.clinicsService.findOne(updateAppointmentDto.clinicId);
    }
    
    this.appointmentRepository.merge(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const appointment = await this.findOne(id);
    await this.appointmentRepository.remove(appointment);
  }

  async findByProfessionalAndDate(professionalId: string, date: Date): Promise<Appointment[]> {
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    return await this.appointmentRepository.find({
      where: {
        professional: { id: professionalId },
        date: Between(startDate, endDate),
      },
      order: { date: 'ASC' },
    });
  }
}