import { Measure } from '../../../domain/entities/Measure';
import { IMeasureRepository } from '../../../domain/repositories/measureRepository';

export class GetOneMeasureUseCase {
  constructor(private measureRepository: IMeasureRepository) {}

  async execute(options: any): Promise<Measure> {
    return this.measureRepository.findOne(options);
  }
}
