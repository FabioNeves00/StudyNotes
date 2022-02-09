import { Schema, model, models } from "mongoose";

export interface IUser {
  email: string;
  notes: INote[];
}

export interface INote {
  id: number;
  name: string;
  desc: string;
  link?: string;
  color?: string;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  notes: [
    {
      id: { type: Number, required: true },
      name: { type: String, required: true },
      desc: { type: String, required: true },
      link: { type: String, required: false },
      color: { type: String, required: false },
    },
  ],
});

export default models.User || model<IUser>("User", UserSchema);
