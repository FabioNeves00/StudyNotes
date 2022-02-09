import MediaCard from "@components/Card";
import Layout from "@components/Layout";
import { INote } from "@models/User";
import axios from "axios";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Notes: NextPage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [textInput, setTextInput] = useState<String>("");
  const [data, setData] = useState<INote[]>([]);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    console.log(textInput);
    
    const { success, error } =
      textInput === ''
        ? (await axios.get("/api/notes/search")).data
        : (await axios.post(`/api/notes/search/${textInput}`)).data;
    if (success) {
      setData(success);
      setIsLoading(false);
    }
  }, [textInput, setData]);

  useEffect(() => {
    const getData = async () => {
      const { success, error } = (await axios.get("/api/user/")).data;
      if (error === "Email not on DB") {
        const { success, error } = (await axios.post("/api/user/")).data;
        if (error) {
          alert(error);
        }
        setData(success.notes);
      }
      setData(success.notes);
    };
    if (status === "authenticated") {
      getData();
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Note Viewer</title>
        <link rel="shortcut icon" href="/bookmark-icon.png" type="image/png" />
      </Head>
      <Layout>
        <div className="w-screen h-screen flex flex-col items-center">
          <div className="h-fit w-max mt-4 flex">
            <label
              htmlFor="search"
              className="block text-2xl mr-6 font-medium text-white"
            >
              Search:
            </label>
            <input
              type="text"
              name="search"
              id="search"
              onChange={(e) => setTextInput(e.target.value)}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-max mr-6 h-10 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md outline-none shadow-inner shadow-black"
              placeholder="Math, Lizard, Geometry..."
            />
            <div>
            <button onClick={handleSearch}>
              <SearchIcon sx={{ color: "white" }} fontSize="large" />
            </button>
            <Link href="/notes/newNote">
              <button className="text-white font-bold bg-purple-800">
                New +
              </button>
            </Link>
            </div>
          </div>
          <div className="section bg-slate-200 w-4/5 h-3/4 mt-6 flex items-center justify-center">
            {
              isLoading && (
                <div className="h-full flex items-center justify-center">
                  <h1 className="w-full text-center">Carregando...</h1>
                </div>
              )
            }
            <div className="h-full w-full flex overflow-y-scroll flex-wrap">
              {data.length !== 0 &&
                !isLoading &&
                data.map((note, index) => {
                  return (
                    <MediaCard
                      key={index}
                      id={note.id}
                      color={note.color || ""}
                      name={note.name}
                      link={note.link || ""}
                      desc={note.desc}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Notes;
