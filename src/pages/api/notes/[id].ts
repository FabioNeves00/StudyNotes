import User, { INote, IUser } from "@models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/database";
import { getSession } from "next-auth/react";

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  success: INote[]| INote
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
        const { id } = req.query;
        const notes: INote[] | null = await User.findOne(
          { email: session.user?.email },
          { notes: 1 }
        );
        if(!notes){
          res.json({ error: `User not found` });
        }
        const note: INote[] | undefined = notes!.filter((note:INote) => note._id!.toString() === id )
        res.json({ success: note });
      } catch (error) {
        res.json({ error: `${error}` });
      }
      break;
    default:
      res.status(402).json({ error: "Method not allowed" });
      break;
  }
};
