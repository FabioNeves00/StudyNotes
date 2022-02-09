import Layout from "@components/Layout";
import { NextPage } from "next";
import ClassIcon from "@mui/icons-material/Class";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home Page</title>
        <link rel="shortcut icon" href="/home-icon.png" type="image/png" />
      </Head>
      <Layout>
        <main className="w-full h-full flex justify-center items-center">
          <div className="lg grid overflow-hidden grid-cols-4 grid-rows-4 gap-4">
            <div className="box row-span-4">
              <img src="/home-img.jpeg" alt="" />
            </div>
            <div className="box row-span-1 col-start-2 col-span-2">
              <h1 className="text-white text-6xl no-underline m-0 ">
                StudyNotes
              </h1>
            </div>
            <div className="box row-span-2 col-start-2 col-span-2">
              <div className="flex-shrink-0 h-32 flex justify-center items-center bg-slate-700 rounded-lg">
                <ClassIcon sx={{ color: "white", fontSize: 80 }} />
                <h1 className="text-white text-6xl no-underline m-0 ">
                  StudyNotes
                </h1>
              </div>
            </div>
            <div className="box row-start-1 row-span-4 col-start-4">
              <img src="/home-img.jpeg" alt="" />
            </div>
            <div className="box row-span-1 col-start-2 col-span-2">
              <h1 className="text-white text-6xl no-underline m-0 ">
                StudyNotes
              </h1>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
