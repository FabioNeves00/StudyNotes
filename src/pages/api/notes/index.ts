import User, { INote, IUser } from "@models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/database";
import { getSession } from "next-auth/react";

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  success: INote | INote[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
): Promise<void> => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(402).json({ error: "Method not allowed" });
  }
  switch (req.method) {
    case "GET":
      await dbConnect();
      let user: IUser | null = await User.findOne({
        email: session.user?.email,
      });
      if (!user) {
        user = await User.create({
          email: session.user?.email,
          notes: [],
        });
      }
      res.status(200).json({ success: user!.notes });
      break;
    case "POST":
      await dbConnect();
      const new_note = { ...req.body };
      const note: INote | null = await User.findOneAndUpdate(
        { email: session.user?.email },
        { $push: { notes: new_note } },
        { notes: 1, email: 1 }
      );
      if (!note) {
        res.status(400).json({ error: "Error trying to create note" });
      }
      res.status(200).json({ success: note! });
      break;
    default:
      res.status(402).json({ error: "Method not allowed" });
      break;
  }
};
