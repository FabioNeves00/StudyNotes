import { INote } from "@models/User";
import Image from "next/image";
import important from "@assets/importantStar.svg";
import filterButton from "@assets/filterButton.svg";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function MediaCard(note: INote) {
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
            {note.name}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            className="desc"
          >
            {note.desc}
          </Typography>
        </div>
        <Image width={25} src={important} alt="danger" />
      </CardContent>
      <CardActions className="flex justify-end">
        <Link href={`/notes/${note._id}`}>
          <Button
            size="small"
            color="primary"
            className="neumorphismButton font-bold mr-4"
          >
            View More
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
