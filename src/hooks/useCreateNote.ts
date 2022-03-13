import RequestAPI from "@lib/api";
import { INote } from "@models/User";
import { useEffect, useState } from "react";

export function useCreateNote<T = any>({ name, desc, color, link }: INote) {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const {data: response} = await RequestAPI.createNote<T>("/notes", {name, desc, color, link});
    setData(data);
    setIsLoading(false);
  };

  useEffect(() => {handleSubmit()}, [data]);
  return [data, isLoading];
};
