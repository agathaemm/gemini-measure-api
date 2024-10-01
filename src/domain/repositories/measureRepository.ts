import { Measure } from '../entities/Measure';

export interface IMeasureRepository {
  create(measure: Measure): Promise<Measure>;
  findById(id: string): Promise<Measure | null>;
  update(measure: Measure): Promise<Measure | null>;
  delete(id: string): Promise<void>;
  findAll(options?: any): Promise<Measure[]>;
  findOne(options: any): Promise<Measure | null>;
}
