import { Controller, Get, Param } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly service: AnalyticsService) {}

  @Get('patients-per-doctor')
  patientsPerDoctor() {
    return this.service.patientsPerDoctor();
  }

  @Get('appointments-by-modality')
  appointmentsByModality() {
    return this.service.appointmentsByModality();
  }

  @Get('history-per-month/:year')
  historyPerMonth(@Param('year') year: string) {
    return this.service.historyEntriesPerMonth(+year);
  }
}
