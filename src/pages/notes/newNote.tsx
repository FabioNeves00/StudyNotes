import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "@components/Layout";
import InputField from "@components/InputField";
import { useState } from "react";
import getVideoId from "get-video-id";
import Box from "@mui/material/Box";
import { useCreateNote } from "@hooks/useCreateNote";

const NotesCreator: NextPage = () => {
  const { data: session, status } = useSession();
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [data, loading, createNote] = useCreateNote();

  const handleSubmit = () => {
    
    if (!loading) {
      createNote({ name, desc, link });
      setDesc("");
      setName("");
      setLink("");
      console.log(data);
    }
  };

  return (
    <>
      <Head>
        <title>Note Creator</title>
        <link rel="shortcut icon" href="/bookmark-icon.png" type="image/png" />
      </Head>
      <Layout backButton={true} backPage="/notes">
        <main className="w-full h-full flex flex-col items-center">
          <h1 className="my-4 text-4xl text-white">Create a new Note</h1>
          <section className="w-4/6 h-4/5 bg-extra flex flex-col items-center justify-center gap-12">
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
                state={name}
                type={"text"}
                stateHook={setName}
                required={true}
                name="Título"
                multiline={false}
              />
              <InputField
                state={desc}
                type={"text"}
                stateHook={setDesc}
                required={true}
                name="Descrição"
                multiline={true}
              />
              <InputField
                state={link}
                type={"url"}
                stateHook={setLink}
                required={false}
                name="Link para imagem ou link de video do youtube"
                multiline={false}
              />
            </Box>
            <button
              type="submit"
              className="bg-button-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default NotesCreator;
