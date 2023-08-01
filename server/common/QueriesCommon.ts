import { Model, Document } from 'mongoose';
import { LeanDocument } from 'mongoose';

abstract class QueriesCommon<ModelType extends Document> {
    protected model: Model<ModelType>;

    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    protected async getAll(): Promise<LeanDocument<ModelType>[]> {
        try {
            const query = this.model.find().lean();
            const docs: LeanDocument<ModelType>[] = await query.exec();
            return docs;
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error executing query');
        }
    }

    protected async getOneById(id: number ): Promise<any> {
        try {
            const query = this.model.findById(id).lean();
            const doc: any = await query.exec();
            return doc;
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error executing query');
        }
    }

    protected async insert(doc: ModelType): Promise<string> {
        try {
            await this.model.create(doc);
            return 'Insertado correctamente :D';
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error executing query');
        }
    }

    protected async put(id: number, doc: ModelType): Promise<string> {
        try {
            const updates: Partial<ModelType> = doc;
            await this.model.findByIdAndUpdate(id, updates);
            return 'Actualizado correctamente :D';
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error executing query');
        }
    }

    protected async delete(id:number): Promise<string> {
        try {
            await this.model.findByIdAndDelete(id);
            return `${this.model.collection.name} eliminado correctamente :D`;
        } catch (error) {
            console.error('Error executing query:', error);
            throw new Error('Error executing query');
        }
    }
}

export default QueriesCommon;