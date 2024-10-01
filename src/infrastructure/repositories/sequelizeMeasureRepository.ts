import { Measure } from '../../domain/entities/Measure';
import { IMeasureRepository } from '../../domain/repositories/measureRepository';
import { MeasureModel } from '../database/models/measureModel';

export class SequelizeMeasureRepository implements IMeasureRepository {
  async create(measure: Measure): Promise<Measure> {
    const createdMeasure = await MeasureModel.create({
      customerId: measure.customerId,
      datetime: measure.datetime,
      imageUrl: measure.imageUrl,
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
      updatedMeasure.confirmed = !!measure.confirmed;
      if (measure.imageUrl) updatedMeasure.imageUrl = measure.imageUrl;
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

  async findAll(options?: any): Promise<Measure[]> {
    const measures = await MeasureModel.findAll(options);
    return measures.map((measure) => new Measure({ ...measure.dataValues }));
  }

  async findOne(options: any): Promise<Measure | null> {
    const measure = await MeasureModel.findOne(options);
    if (!measure) return null;
    return new Measure({ ...measure.dataValues });
  }
}
