import { Document, model, models, Schema, Types } from "mongoose";

export interface IAnswer {
  content: string;
  question: Types.ObjectId;
  author: Types.ObjectId;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
}

export type IAnswerDoc = IAnswer & Document;
const AnswerSchema = new Schema<IAnswer>(
  {
    content: { type: String, required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Answer = models?.Answer || model<IAnswer>("Answer", AnswerSchema);

export default Answer;
