import mongoose, { Schema, model, connect, Types } from "mongoose";

export interface IUser {
  email: string;
  auth_id: string;
  has_access: boolean;
  company_info: {
    name: string;
    org_number: string;
  };
  receipt_templates: Types.ObjectId[];
}


const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true },
    auth_id: { type: String, required: true },
    has_access: { type: Boolean, required: true },
    company_info: {
      name: {type: String, required: true},
      org_number: {type: String, required: true}
    },
    receipt_templates: [
      { type: Schema.Types.ObjectId, ref: "ReceiptTemplate" },
    ],
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);
export { User };
