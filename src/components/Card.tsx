import Image from "next/image";
import important from "@assets/importantStar.svg";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import { ObjectId } from "mongoose";

interface CardProps {
  name: string;
  _id: ObjectId;
  desc: string;
  isOpen: boolean;
  handleOpenClose: Dispatch<SetStateAction<boolean>>;
}

export default function MediaCard({
  name,
  _id,
  desc,
  isOpen,
  handleOpenClose,
}: CardProps) {
  return (
    <Card className="neumorphismCard border-none shadow-black aspect-video min-h-fit flex flex-col justify-around m-2 sm:h-1/4 sm:w-full md:w-1/4 lg:w-72">
      <CardContent className="flex justify-between">
        <div>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className="title"
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="desc"
          >
            {desc}
          </Typography>
        </div>
        <Image width={25} src={important} alt="danger" />
      </CardContent>
      <CardActions className="flex justify-end">
        <Button
          size="small"
          color="primary"
          className="neumorphismButton font-bold mr-4"
          onClick={() => {
            handleOpenClose(!isOpen);
          }}
        >
          View More
        </Button>
      </CardActions>
    </Card>
  );
}
