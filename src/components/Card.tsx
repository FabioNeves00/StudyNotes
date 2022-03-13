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
    <Card className="neumorphismCard border-none shadow-black aspect-video min-h-fit flex flex-col justify-around m-2 sm:h-1/2 sm:w-full md:w-72 ">
      <CardMedia
        className="aspect-square"
        image={
          note.link ||
          "https://vejasp.abril.com.br/wp-content/uploads/2016/12/000153.jpg"
        }
        title={note.name}
      />
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
        <Link href={`/notes/${note._id}`}>
          <Button
            size="small"
            color="primary"
            className="neumorphismButton font-bold"
          >
            View More
          </Button>
        </Link>
        <Button
          size="small"
          color="primary"
          className="neumorphismButton font-bold"
        >
          Edit
        </Button>
        <Button
          size="small"
          color="primary"
          className="neumorphismButton font-bold"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
