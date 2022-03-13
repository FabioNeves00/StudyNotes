import { Schema, model, models, ObjectId } from "mongoose";

export interface IUser {
  email: string;
  notes: INote[];
}

export interface INote {
  _id?: ObjectId;
  name: string;
  desc: string;
  link?: string | undefined;
  color?: string | undefined;
}

const NoteSchema = new Schema<INote>({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  link: { type: String, required: false },
  color: { type: String, required: false },
});

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  notes: [NoteSchema],
});

export default models.User || model<IUser>("User", UserSchema);
