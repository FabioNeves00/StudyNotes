import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "@components/Layout";
import InputField from "@components/InputField";
import { useState } from "react";
import getVideoId from "get-video-id";
import Box from "@mui/material/Box";

const NotesCreator: NextPage = () => {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [link, setLink] = useState("");

  const handleSubmit = () => {};

  return (
    <>
      <Head>
        <title>Note Creator</title>
        <link rel="shortcut icon" href="/bookmark-icon.png" type="image/png" />
      </Head>
      <Layout>
        <main className="w-full h-full flex flex-col items-center">
          <h1 className="my-2 text-4xl text-white">Create a new Note</h1>
          <section className="bg-slate-300 w-4/6 h-4/5">
            <Box
              component="form"
              sx={{
                width: 500,
                maxWidth: "100%",
                margin: 2,
              }}
              autoComplete="off"
            >
              <InputField
                state={title}
                type={"text"}
                stateHook={setTitle}
                required={true}
                name="Título"
              />
              <InputField
                state={desc}
                type={"text"}
                stateHook={setDesc}
                required={true}
                name="Descrição"
              />
              <InputField
                state={link}
                type={"url"}
                stateHook={setLink}
                required={false}
                name="Link de video do Youtube"
              />
            </Box>
            <button onClick={handleSubmit}>Submit</button>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default NotesCreator;
