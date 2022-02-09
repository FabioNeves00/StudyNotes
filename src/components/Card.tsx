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
    <Card className="max-h-md max-w-md h-40 flex flex-col justify-around m-2 sm:w-max sm">
      <CardMedia className="max-w-xs" image={note.link} title={note.name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {note.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {note.desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/notes/${note.id}`}>
          <Button size="small" color="primary" className="text-stone-800 font-bold">
            View More
          </Button>
        </Link>
        <Button size="small" color="primary" className="text-stone-800 font-bold">
          Edit
        </Button>
        <Button size="small" color="primary" className="text-stone-800 font-bold">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
