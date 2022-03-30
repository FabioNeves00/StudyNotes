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
    case "PATCH":
      try {
        await dbConnect();
        const { id } = req.query;
        const { prop, newValue } = req.body;

        const { notes } = await User.findOne(
          { email: session.user?.email },
          { notes: 1 }
        );

        const selected_note = notes.filter(
          (note: INote) => note._id!.toString() === id
        );

        selected_note[0][prop] = newValue;

        const newnote = await User.findOneAndUpdate(
          { email: session.user?.email, "notes._id": id },
          { "notes.$": selected_note }
        );

        res.json({ success: newnote });
      } catch (error) {
        res.json({ error: `${error}` });
      }
      break;
    case "DELETE":
      try {
          await dbConnect();
          const {id} = req.query

          const notes: INote[] | null = await User.findOneAndUpdate({email: session.user?.email}, {notes: {$pull: {_id: id}}}, {notes: 1});
            if(!notes){
                res.status(200).json({error: "Note or User not found"})
            }
            res.json({success: notes!})
      } catch (error) {
        res.json({ error: `${error}` });
      }
      break;
    default:
      res.status(402).json({ error: "Method not allowed" });
      break;
  }
};
