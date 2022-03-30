import User, { INote, IUser } from "@models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/database";
import { getSession } from "next-auth/react";

export type ErrorResponse = {
  error: string;
};

export type SuccessResponse = {
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

        const { search } = req.query;
        if (!search) {
          return res.status(402).json({ error: "Missing body params" });
        }
        let user: IUser | null = await User.findOne({
          email: session.user?.email,
        });
        if (!user) {
          user = await User.create({
            email: session.user?.email,
            notes: [],
          });
        }
        
        const note: INote[] | undefined = user?.notes.filter(
          (note) =>{
            console.log(note);
            
            return note.desc.includes(search.toString()) || note.name.includes(search.toString())}
        );
        if (!note) {
          return res.status(402).json({ error: "Note not found" });
        }
        res.status(200).json({ success: note });
      } catch (error) {
        res.status(200).json({ error: `${error}` });
      }
      break;
    default:
      res.status(402).json({ error: "Method not allowed" });
      break;
  }
};
