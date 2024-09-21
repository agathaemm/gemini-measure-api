import { Measure } from '../../../domain/entities/Measure';
import { IMeasureRepository } from '../../../domain/repositories/measureRepository';

export class GetMeasureUseCase {
  constructor(private measureRepository: IMeasureRepository) {}

  async execute(id: string): Promise<Measure | null> {
    return this.measureRepository.findById(id);
  }
}
