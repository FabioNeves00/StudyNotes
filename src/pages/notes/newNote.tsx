import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "@components/Layout";

const NotesCreator: NextPage = () => {
  const { data: session, status } = useSession();
  
  return (
    <>
      <Head>
        <title>Note Creator</title>
        <link rel="shortcut icon" href="/bookmark-icon.png" type="image/png" />
      </Head>
      <Layout>
        <main className="w-full h-full flex justify-center items-center">
            <section className="bg-slate-300 w-4/6 h-4/5">

            </section>
        </main>
      </Layout>
    </>
  );
};

export default NotesCreator;
