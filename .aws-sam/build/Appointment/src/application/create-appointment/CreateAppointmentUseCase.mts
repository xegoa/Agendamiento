import { Appointment } from "../../domain/Appointment.mjs";
import { IAppointmentRepository } from "../../domain/interfaces/IAppintmentRepository.mjs";
import { INotificationPublisher } from "../../domain/interfaces/INotificationPublisher.mjs";
import { CreateAppointmentDTO } from "./CreateAppointmentDTO.mjs";


export class CreateAppointmentUseCase {
  constructor(
    private repo: IAppointmentRepository,
    private notifier: INotificationPublisher
  ) {}

  async execute(dto: CreateAppointmentDTO): Promise<{ id: string }> {
    // Validaciones básicas
    if (!/^[0-9]{5}$/.test(dto.insuredId)) throw new Error('insuredId inválido');
    const timestamp = Date.now();
    const id = `${dto.insuredId}-${dto.scheduleId}-${timestamp}`;

    const appointment = new Appointment(
      id,
      dto.insuredId,
      dto.scheduleId,
      'pending',
      dto.countryISO,
      timestamp,
      undefined,
      dto
    );

    await this.repo.save(appointment);
    await this.notifier.publish(appointment);
    return { id };
  }
}