import { CreateAppointmentUseCase } from "../application/create-appointment/CreateAppointmentUseCase.mjs";
import { ListAppointmentsUseCase } from "../application/list-appointments/ListAppointmentsUseCase.mjs";
import { ConfirmAppointmentUseCase } from "../domain/interfaces/IAppointmentRepository.mjs";
import { DynamoAppointmentRepository } from "./dynamo/DynamoAppointmentRepository.mjs";
import { SnsNotificationPublisher } from "./sns/SnsNotificationPublisher.mjs";


export const container = {
  createAppointmentUseCase: new CreateAppointmentUseCase(
    new DynamoAppointmentRepository(),
    new SnsNotificationPublisher()
  ),
  listAppointmentsUseCase: new ListAppointmentsUseCase(
    new DynamoAppointmentRepository()
  ),
  confirmAppointmentUseCase: new ConfirmAppointmentUseCase(
    new DynamoAppointmentRepository()
  )
};
