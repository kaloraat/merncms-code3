import { useContext } from "react";
import { AuthContext } from "../context/auth";
import Head from "next/head";
import FullWidthImage from "../components/pages/FullWidthImage";

function Home() {
  // context
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>Modern Content Management System - CMS</title>
        <meta
          name="description"
          content="Read latest blog posts on web development"
        />
      </Head>
      <FullWidthImage />
    </>
  );
}

export default Home;
