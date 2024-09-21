import { Measure, TMeasure } from '../../../domain/entities/Measure';
import { IMeasureRepository } from '../../../domain/repositories/measureRepository';

export class UpdateMeasureUseCase {
  constructor(private measureRepository: IMeasureRepository) {}

  async execute(params: TMeasure): Promise<Measure | null> {
    const measure = new Measure(params);
    return this.measureRepository.update(measure);
  }
}
