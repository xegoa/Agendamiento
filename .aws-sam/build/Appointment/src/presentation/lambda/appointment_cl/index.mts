import { container } from "../../../infraestructure/di-container.mjs";
import { RdsAppointmentPersister } from "../../../infraestructure/rds/RdsAppointmentPersister.mjs";

export const handler = async (event: any) => {
  const persister = new RdsAppointmentPersister();
  for (const r of event.Records) {
    const data = JSON.parse(r.body);
    await persister.persist(data);
    await container.confirmAppointmentUseCase.execute(data.id);
  }
  return { statusCode: 200 };
};
