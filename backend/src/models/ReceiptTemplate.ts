import mongoose, { Schema, model, connect, Types } from "mongoose";

export interface IReceiptTemplate {
  item: string;
  moms: number; // VAT - tax
  total_price: number;
  user: Types.ObjectId;
}

const ReceiptTemplateSchema = new Schema<IReceiptTemplate>(
  {
    item: { type: String, required: true },
    moms: { type: Number, required: true },
    total_price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ReceiptTemplate = model<IReceiptTemplate>(
  "ReceiptTemplate",
  ReceiptTemplateSchema
);

export { ReceiptTemplate };
