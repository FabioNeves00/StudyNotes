import User from "@models/User";
import { randomBytes } from "crypto";

export default async function getId(): Promise<Buffer> {
  let id = randomBytes(8);
  if (await User.findOne({ notes: { $id: { id } } })) {
    getId();
  }
  return id;
}
