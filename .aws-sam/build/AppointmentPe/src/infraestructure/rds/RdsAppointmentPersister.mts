import { Appointment } from "../../domain/Appointment.mjs";

export class RdsAppointmentPersister {
  async persist(appointment: Appointment): Promise<void> {
    // Conexión a RDS y SQL Insert (o usar ORM)
    console.log('Persistiendo en RDS:', appointment);
  }
}