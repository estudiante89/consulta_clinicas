import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TelemedicineService } from '../../services/telemedicine.service';
import { AppointmentService } from '../../../appointments/services/appointment.service';

declare const OT: any;

@Component({
  selector: 'app-telemedicine-session',
  templateUrl: './telemedicine-session.component.html',
  styleUrls: ['./telemedicine-session.component.css']
})
export class TelemedicineSessionComponent implements OnInit, OnDestroy {
  @ViewChild('publisherDiv') publisherDiv: ElementRef;
  @ViewChild('subscribersDiv') subscribersDiv: ElementRef;

  sessionId: string;
  appointmentId: string;
  session: any;
  publisher: any;
  apiKey = 'YOUR_OPENTOK_API_KEY';
  connected = false;

  constructor(
    private route: ActivatedRoute,
    private telemedicineService: TelemedicineService,
    private appointmentService: AppointmentService,
  ) { }

  async ngOnInit() {
    this.appointmentId = this.route.snapshot.params.id;
    
    try {
      const sessionInfo = await this.telemedicineService.initiateSession(this.appointmentId);
      this.sessionId = sessionInfo.sessionId;
      
      this.initializeSession(sessionInfo.sessionId, sessionInfo.token);
    } catch (err) {
      console.error('Error initiating session:', err);
    }
  }

  initializeSession(sessionId: string, token: string) {
    this.session = OT.initSession(this.apiKey, sessionId);
    
    this.session.on({
      streamCreated: (event) => {
        this.session.subscribe(event.stream, this.subscribersDiv.nativeElement, {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        });
      },
      sessionConnected: () => {
        this.connected = true;
        this.publisher = OT.initPublisher(this.publisherDiv.nativeElement, {
          insertMode: 'append',
          width: '100%',
          height: '100%',
          name: 'You'
        });
        
        this.session.publish(this.publisher, (error) => {
          if (error) {
            console.error('Error publishing:', error);
          }
        });
      },
      sessionDisconnected: () => {
        this.connected = false;
        this.endSession();
      }
    });
    
    this.session.connect(token, (error) => {
      if (error) {
        console.error('Error connecting:', error);
      }
    });
  }

  async endSession() {
    try {
      await this.telemedicineService.endSession(this.sessionId);
      await this.appointmentService.completeAppointment(this.appointmentId);
    } catch (err) {
      console.error('Error ending session:', err);
    }
  }

  ngOnDestroy() {
    if (this.session) {
      this.session.disconnect();
    }
  }
}