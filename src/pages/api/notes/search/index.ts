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
      try {
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
      } catch (error) {
        res.status(200).json({ error: `${error}` });
      }
      break;
    default:
      res.status(402).json({ error: "Method not allowed" });
      break;
  }
};
