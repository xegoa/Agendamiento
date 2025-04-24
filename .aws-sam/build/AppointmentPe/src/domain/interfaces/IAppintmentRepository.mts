import { Appointment } from "../Appointment.mjs";

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
  updateStatus(id: string, status: 'completed', completedAt: number): Promise<void>;
}
