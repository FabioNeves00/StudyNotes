import { INote } from "@models/User";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function MediaCard(note: INote) {
  return (
    <Card className="neumorphismCard border-none shadow-none h-40 flex flex-col justify-around m-2 my-4 sm:w-full md:w-72 ">
      <CardMedia className="max-w-xs" image={note.link} title={note.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" className="title">
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
      </CardContent>
      <CardActions>
        <Link href={`/notes/${note.id}`}>
          <Button
            size="small"
            color="primary"
            className="neumorphism font-bold"
          >
            View More
          </Button>
        </Link>
        <Button size="small" color="primary" className="neumorphismButtons font-bold">
          Edit
        </Button>
        <Button size="small" color="primary" className="neumorphismButtons font-bold">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
