import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({ cors: true })
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth.token;
      const payload = this.jwtService.verify(token);
      const user = await this.authService.validateUserById(payload.sub);
      
      if (!user) {
        client.disconnect();
        return;
      }

      client.join(user.id);
      client.join(user.role);
      
      console.log(`Client connected: ${user.id}`);
    } catch (err) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendAppointmentNotification(userId: string, message: string) {
    this.server.to(userId).emit('appointment_notification', { message });
  }

  sendSystemNotification(role: string, message: string) {
    this.server.to(role).emit('system_notification', { message });
  }
}