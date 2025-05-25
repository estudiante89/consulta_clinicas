import { Component, OnInit } from '@angular/core';
import { Patient } from '../../models/patient.model';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  isLoading = true;

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.patientService.getPatients().subscribe(
      patients => {
        this.patients = patients;
        this.isLoading = false;
      },
      error => {
        console.error('Error loading patients:', error);
        this.isLoading = false;
      }
    );
  }

  deletePatient(id: string): void {
    if (confirm('Are you sure you want to delete this patient?')) {
      this.patientService.deletePatient(id).subscribe(
        () => {
          this.patients = this.patients.filter(p => p.id !== id);
        },
        error => {
          console.error('Error deleting patient:', error);
        }
      );
    }
  }
}