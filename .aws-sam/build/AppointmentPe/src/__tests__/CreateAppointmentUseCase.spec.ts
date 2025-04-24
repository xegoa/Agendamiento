import { expect, jest, describe, beforeEach, it } from '@jest/globals';
import { CreateAppointmentUseCase } from '../application/create-appointment/CreateAppointmentUseCase.mjs';
import { IAppointmentRepository } from '../domain/interfaces/IAppintmentRepository.mjs';
import { INotificationPublisher } from '../domain/interfaces/INotificationPublisher.mjs';

describe('CreateAppointmentUseCase', () => {
  let useCase: CreateAppointmentUseCase;
  let repo: jest.MockedObject<IAppointmentRepository>;
  let publisher: jest.MockedObject<INotificationPublisher>;

  beforeEach(() => {
    repo = { save: jest.fn() } as unknown as jest.MockedObject<IAppointmentRepository>;
    publisher = { publish: jest.fn() } as unknown as jest.MockedObject<INotificationPublisher>;
    useCase = new CreateAppointmentUseCase(repo, publisher);
  });

  it('lanza error si insuredId está vacío', async () => {
    await expect(
      useCase.execute({ insuredId: '', scheduleId: 1, countryISO: 'PE' })
    ).rejects.toThrow('insuredId inválido');
  });

  it('guarda cita y envía notificación', async () => {
    jest.mocked(repo.save).mockResolvedValue(undefined);
    jest.mocked(publisher.publish).mockResolvedValue(undefined);
    await useCase.execute({ insuredId: '00301', scheduleId: 100, countryISO: 'PE' });
    expect(repo.save).toHaveBeenCalled();
    expect(publisher.publish).toHaveBeenCalled();
  });
});