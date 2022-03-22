import Layout from "@components/Layout";
import LoadingCard from "@components/LoadingCard";
import Search from "@components/Search";
import MediaCard from "@components/Card";
import { INote } from "@models/User";
import RequestAPI from "@lib/api";
import { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";  
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
          <div className="section bg-extra w-11/12 h-3/4 mt-2 flex items-center justify-center">
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
                      name={note.name}
                      link={note.link}
                      desc={note.desc}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Notes;
