import { Appointment } from "../Appointment.mjs";

export interface INotificationPublisher {
  publish(appointment: Appointment): Promise<void>;
}