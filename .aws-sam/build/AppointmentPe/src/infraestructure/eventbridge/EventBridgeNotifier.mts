import { EventBridgeClient, PutEventsCommand } from '@aws-sdk/client-eventbridge';
import { Appointment } from '../../domain/Appointment.mjs';

export class EventBridgeNotifier {
  private client = new EventBridgeClient({ region: process.env.AWS_REGION });

  async notifyConfirmed(appointment: Appointment): Promise<void> {
    await this.client.send(new PutEventsCommand({
      Entries: [{
        EventBusName: process.env.EVENT_BUS_NAME!,
        Source: 'appointments.service',
        DetailType: 'AppointmentConfirmed',
        Detail: JSON.stringify({ id: appointment.id, countryISO: appointment.countryISO })
      }]
    }));
  }
}