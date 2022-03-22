import { NextPage } from "next";
import Head from "next/head";
import AA from "@assets/aa.svg";
import Image from "next/image";
import ClassIcon from "@mui/icons-material/Class";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  return (
    <>
      <Head>
        <title>Home Page</title>
        <link rel="shortcut icon" href="/home-icon.png" type="image/png" />
      </Head>
      <main className="w-screen h-screen flex justify-center items-center bg-bg-primary gap-x-36">
        <div className="md:block hidden">
          <Image src={AA} alt="aa" />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-white text-6xl font-bold no-underline m-0 ">
            <ClassIcon className="text-white" sx={{ fontSize: 70 }} />
            StudyNotes
          </h1>
          <h5 className="w-3/4 text-white text-center">
            Um amigo para ajudar na organização dos seus estudos.
          </h5>
          <Link href={session ? "/notes" : "/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fnotes"}>
            <button className="bg-button-primary drop-shadow-lg shadow-black w-4/5 h-14 text-3xl font-bold text-white rounded-md mt-24 hover:brightness-95 active:brightness-75">
              {session ? "Acesse suas anotações" : "Faça login para começar"}
            </button>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
