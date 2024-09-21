import { Measure } from '../../domain/entities/Measure';
import { IMeasureRepository } from '../../domain/repositories/measureRepository';
import { MeasureModel } from '../database/models/measureModel';

export class SequelizeMeasureRepository implements IMeasureRepository {
  async create(measure: Measure): Promise<Measure> {
    const createdMeasure = await MeasureModel.create({
      customerId: measure.customerId,
      datetime: measure.datetime,
      type: measure.type,
    });

    return new Measure({ ...createdMeasure.dataValues });
  }

  async findById(id: string): Promise<Measure | null> {
    const measure = await MeasureModel.findByPk(id);
    return measure ? new Measure({ ...measure.dataValues }) : null;
  }

  async update(measure: Measure): Promise<Measure | null> {
    const updatedMeasure = await MeasureModel.findByPk(measure.id);
    if (updatedMeasure) {
      updatedMeasure.customerId = measure.customerId;
      updatedMeasure.datetime = measure.datetime;
      updatedMeasure.type = measure.type;
      updatedMeasure.value = measure.value || null;
      await updatedMeasure.save();
      return new Measure({ ...updatedMeasure.dataValues });
    }

    return null;
  }

  async delete(id: string): Promise<void> {
    const measure = await MeasureModel.findByPk(id);
    if (measure) {
      await measure.destroy();
    }
  }

  async findAll(): Promise<Measure[]> {
    const measures = await MeasureModel.findAll();
    return measures.map((measure) => new Measure({ ...measure.dataValues }));
  }
}
