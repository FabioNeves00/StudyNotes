import { GetServerSidePropsContext } from "next";
import { getProviders, signIn } from "next-auth/react";
import Head from "next/head";

export default function SignIn({ providers }): JSX.Element {
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <main>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </main>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
