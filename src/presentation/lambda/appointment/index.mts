import { container } from "../../../infraestructure/di-container.mjs";

export const handler = async (event: any) => {
  if (event.Records) {
    const handlers = container.confirmAppointmentUseCase;
    for (const r of event.Records) {
      const { id } = JSON.parse(r.body);
      await handlers.execute(id);
    }
    return { statusCode: 200 };
  }
  if (event.httpMethod === 'GET') {
    const dto = {insuredId:event.queryStringParameters?.insuredId??null}; 
    if (!dto.insuredId) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Falta parametro` }),
      };
    }

    const items = await container.listAppointmentsUseCase.execute(dto);
    return { statusCode: 200, body: JSON.stringify({ count: items.length, items }) };
  }
  if (event.httpMethod === 'POST') {
    const dto = JSON.parse(event.body);
    const { id } = await container.createAppointmentUseCase.execute(dto);
    return { statusCode: 201, body: JSON.stringify({ appointmentId: id, status: 'pending' }) };
  }
  return { statusCode: 400 };
};