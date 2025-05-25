import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointments/services/appointment.service';
import { PatientService } from '../patients/services/patient.service';
import { ProfessionalService } from '../professionals/services/professional.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stats = {
    totalPatients: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
    totalProfessionals: 0
  };
  recentAppointments: any[] = [];
  chart: any;

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private professionalService: ProfessionalService
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentAppointments();
  }

  loadStats(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.stats.totalPatients = patients.length;
    });

    this.appointmentService.getAppointments().subscribe(appointments => {
      this.stats.totalAppointments = appointments.length;
      const today = new Date();
      this.stats.upcomingAppointments = appointments.filter(a => 
        new Date(a.date) >= today && a.status === 'scheduled'
      ).length;
    });

    this.professionalService.getProfessionals().subscribe(professionals => {
      this.stats.totalProfessionals = professionals.length;
    });
  }

  loadRecentAppointments(): void {
    this.appointmentService.getAppointments().subscribe(appointments => {
      this.recentAppointments = appointments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);
      
      this.createChart();
    });
  }

  createChart(): void {
    const ctx = document.getElementById('appointmentsChart') as HTMLCanvasElement;
    
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.recentAppointments.map(a => 
          `${a.patient.fullName.substring(0, 10)}... - ${new Date(a.date).toLocaleDateString()}`
        ),
        datasets: [{
          label: 'Appointment Duration (min)',
          data: this.recentAppointments.map(a => a.duration),
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}