import { Measure, TMeasure } from '../../../domain/entities/Measure';
import { IMeasureRepository } from '../../../domain/repositories/measureRepository';

export class CreateMeasureUseCase {
  constructor(private measureRepository: IMeasureRepository) {}

  async execute(params: TMeasure): Promise<Measure> {
    const measure = new Measure(params);
    return this.measureRepository.create(measure);
  }
}
