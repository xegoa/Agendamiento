import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { handler } from '../presentation/lambda/appointment/index.mjs';
import { container } from '../infraestructure/di-container.mjs';

describe('Appointment Lambda Handler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('procesa Records y ejecuta confirmAppointmentUseCase', async () => {
    const records = [
      { body: JSON.stringify({ id: 'abc' }) },
      { body: JSON.stringify({ id: 'def' }) }
    ];
    const response = await handler({ Records: records } as any);
    expect(response).toEqual({ statusCode: 200 });
  });

  it('GET sin insuredId retorna 400', async () => {
    const response = await handler({ httpMethod: 'GET', queryStringParameters: {} } as any);
    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body as string)).toEqual({ message: 'Falta parametro' });
  });

  it('GET con insuredId retorna datos', async () => {
    jest.spyOn(container.listAppointmentsUseCase, 'execute').mockResolvedValue([{ id: '1' }] as any);
    const response = await handler({ httpMethod: 'GET', queryStringParameters: { insuredId: '123' } } as any);
    const body = JSON.parse(response.body as string);
    expect(body.count).toBe(1);
    expect(body.items).toEqual([{ id: '1' }]);
  });

  it('POST crea cita retorna 201', async () => {
    jest.spyOn(container.createAppointmentUseCase, 'execute').mockResolvedValue({ id: 'xyz' } as any);
    const event = { httpMethod: 'POST', body: JSON.stringify({ insuredId: '123', scheduleId: 1, countryISO: 'PE' }) } as any;
    const response = await handler(event);
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body as string)).toEqual({ appointmentId: 'xyz', status: 'pending' });
  });

  it('método no soportado retorna 400', async () => {
    const response = await handler({ httpMethod: 'PUT' } as any);
    expect(response.statusCode).toBe(400);
  });
});