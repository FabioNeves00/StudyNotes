import Layout from "@components/Layout";
import { INote } from "@models/User";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoadingCard from "@components/LoadingCard";
import Search from "@components/Search";
import RequestAPI from "@lib/api";
import MediaCard from "@components/Card";
import Link from "next/link";

const Notes: NextPage = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [textInput, setTextInput] = useState<String>("");
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    if (!session) return;
    setIsLoading(true);
    const notes = async () => {
      const {
        data: { success },
      } = await RequestAPI.getNotes("/notes/search/");
      if (success) {
        setNotes(success);
        setIsLoading(false);
      }
    };
    notes();
  }, [status]);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const {
      data: { success },
    } = await RequestAPI.getNotes(
      "/notes/search/" + textInput
    );

    if (success) {
      setNotes(success);
      setIsLoading(false);
    }
  }, [textInput, setNotes]);

  return (
    <>
      <Head>
        <title>Note Viewer</title>
        <link rel="shortcut icon" href="/bookmark-icon.png" type="image/png" />
      </Head>
      <Layout backButton={true} backPage="/">
        <div className="w-screen h-screen flex flex-col items-center">
          <Search setTextInput={setTextInput} handleSearch={handleSearch} />
          <div className="section bg-extra w-11/12 h-3/4 mt-4 flex items-center justify-center">
            {isLoading && (
              <LoadingCard pulsating={true} title="Loading Cards..." />
            )}
            {notes.length === 0 && !isLoading && (
              <LoadingCard
                pulsating={false}
                title={
                  session
                    ? "You don't have any cards"
                    : "You must be logged to see your cards"
                }
              />
            )}
            {notes.length !== 0 && !isLoading && (
              <div className="pl-2 h-full overflow-y-scroll inline-flex justify-start content-start items-start flex-row flex-wrap">
                {notes.map((note, index) => {
                  return (
                    <MediaCard
                      key={index}
                      _id={note._id}
                      color={note.color || ""}
                      name={note.name}
                      link={note.link || ""}
                      desc={note.desc}
                    />
                  );
                })}
              </div>
            )}
            <Link href="/notes/newNote">
              <a className="absolute w-20 h-20 rounded-full flex items-center justify-center m-0 bottom-28 right-32 no-underline drop-shadow-lg shadow-black">
                <span className="w-full h-full text-center text-white align-text-top text-7xl rounded-full bg-button-primary hover:brightness-90 duration-200">
                  +
                </span>
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Notes;
