import User, { INote, IUser } from "@models/User";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@lib/database";
import { getSession } from "next-auth/react";

type ErrorResponse = {
  error: string;
};

type SuccessResponse = {
  success: IUser;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
): Promise<void> => {
  const session = await getSession({ req })
  if(!session){
    return res.status(402).json({ error: "Method not allowed" });
  }
  switch (req.method) {
    case "GET":
      await dbConnect();
      const user: IUser | null = await User.findOne({email: session?.user?.email})

      if(!user) {return res.status(201).json({ error: "Email not on DB" })}
      res.status(200).json({success: user});
      break;
    case "POST":
      await dbConnect();
      if(session && !(await User.findOne({email: session.user?.email}))){
        const user: IUser = await User.create({
          email: session.user?.email,
          notes: []
        })
        return res.status(200).json({success: user})
      }
      res.status(200).json({ error: "User already registered" })
      break;
    default:
      res.status(402).json({ error: "Method not allowed" });
      break;
  }
};
