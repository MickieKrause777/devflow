import { model, models, Schema } from "mongoose";

export interface IModel {}

const ModelSchema = new Schema<IModel>({});

const Model = models?.Model || model<IModel>("Model", ModelSchema);

export default Model;
