import { Appointment } from "../../domain/Appointment.mjs";
import { IAppointmentRepository } from "../../domain/interfaces/IAppintmentRepository.mjs";
import { ListAppointmentsDTO } from "./ListAppointmentsDTO.mjs";

export class ListAppointmentsUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(dto: ListAppointmentsDTO): Promise<Appointment[]> {
    if (dto.insuredId) return this.repo.findByInsuredId(dto.insuredId);
    return this.repo.findByInsuredId(''); // o método genérico repo.findAll()
  }
}