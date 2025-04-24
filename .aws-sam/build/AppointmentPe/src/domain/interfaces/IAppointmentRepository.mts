import { IAppointmentRepository } from "./IAppintmentRepository.mjs";

export class ConfirmAppointmentUseCase {
  constructor(private repo: IAppointmentRepository) {}

  async execute(id: string): Promise<void> {
    const timestamp = Date.now();
    await this.repo.updateStatus(id, 'completed', timestamp);
  }
}