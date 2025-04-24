
import { PutItemCommand, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';
import { Appointment } from '../../domain/Appointment.mjs';
import { IAppointmentRepository } from '../../domain/interfaces/IAppintmentRepository.mjs';
import { dynamoClient } from './DynamoConfig.mjs';

export class DynamoAppointmentRepository implements IAppointmentRepository {
  private table = process.env.CITAS_TABLE_NAME;

  async save(appointment: Appointment): Promise<void> {
    await dynamoClient.send(new PutItemCommand({
      TableName: this.table,
      Item: {
        id: { S: appointment.id },
        insuredId: { S: appointment.insuredId },
        scheduleId: { N: appointment.scheduleId.toString() },
        status: { S: appointment.status },
        countryISO: { S: appointment.countryISO },
        createdAt: { N: appointment.createdAt.toString() },
        payload: { S: JSON.stringify(appointment.payload) }
      }
    }));
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    console.log('Buscando insuredId =', insuredId, 'en tabla', this.table);
    const resp = await dynamoClient.send(new ScanCommand({
      TableName: this.table,
      FilterExpression: 'insuredId = :i',
      ExpressionAttributeValues: { ':i': { S: insuredId } }
    }));
    console.log('Buscando insuredId =', insuredId, 'en tabla', this.table);
    return (resp.Items || []).map(item => new Appointment(
      item.id.S!, item.insuredId.S!, Number(item.scheduleId.N!), item.status.S! as any,
      item.countryISO.S! as any, Number(item.createdAt.N!), item.completedAt?.N ? Number(item.completedAt.N) : undefined,
      JSON.parse(item.payload.S!)
    ));
  }

  async updateStatus(id: string, status: 'completed', completedAt: number): Promise<void> {
    await dynamoClient.send(new UpdateItemCommand({
      TableName: this.table,
      Key: { id: { S: id } },
      UpdateExpression: 'SET #s = :c, completedAt = :t',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: { ':c': { S: status }, ':t': { N: completedAt.toString() } }
    }));
  }
}