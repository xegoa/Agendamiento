export type CountryISO = 'PE' | 'CL';

export class Appointment {
  constructor(
    public readonly id: string,
    public readonly insuredId: string,
    public readonly scheduleId: number,
    public status: 'pending' | 'completed',
    public readonly countryISO: CountryISO,
    public readonly createdAt: number,
    public completedAt?: number,
    public readonly payload?: unknown
  ) {}
}