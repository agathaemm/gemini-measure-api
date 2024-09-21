import { IMeasureRepository } from '../../../domain/repositories/measureRepository';

export class DeleteMeasureUseCase {
  constructor(private measureRepository: IMeasureRepository) {}

  async execute(id: string): Promise<void> {
    this.measureRepository.delete(id);
  }
}
