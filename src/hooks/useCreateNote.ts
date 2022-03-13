import RequestAPI from "@lib/api";
import { INote } from "@models/User";
import getVideoId from "get-video-id";
import { useState } from "react";

type loading = {
  loading: "true" | "false"
}

export function useCreateNote() {
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(false);

  const createNote = async (note: INote) => {
    if (getVideoId(note.link!).id) {
      note.link = `https://img.youtube.com/vi/${getVideoId(note.link!).id}/0.jpg`;
    }
    setisLoading(state => !state)
    const {data: response} = await RequestAPI.createNote("/notes", note);
    console.log(response);
    setData(response);
    setisLoading(state => !state)
  };

  return [data, isLoading as unknown as loading, createNote] as const;
};
