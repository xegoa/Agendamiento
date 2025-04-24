
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { INotificationPublisher } from '../../domain/interfaces/INotificationPublisher.mjs';
import { Appointment } from '../../domain/Appointment.mjs';

export class SnsNotificationPublisher implements INotificationPublisher {
  private client = new SNSClient({ region: process.env.AWS_REGION });

  async publish(appointment: Appointment): Promise<void> {
    const topicArn = appointment.countryISO === 'PE'
      ? process.env.SNS_TOPIC_PE_ARN!
      : process.env.SNS_TOPIC_CL_ARN!;
    await this.client.send(new PublishCommand({
      TopicArn: topicArn,
      Message: JSON.stringify({ id: appointment.id, insuredId: appointment.insuredId, scheduleId: appointment.scheduleId, countryISO: appointment.countryISO }),
      MessageGroupId: 'appointments'
    }));
  }
}