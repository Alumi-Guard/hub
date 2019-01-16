import Head from "next/head";
import NavBar from "../components/NavBar";
export default ({ children }) => (
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <title>Alumi-Guard</title>
    </Head>
    <style jsx global>{`
      html,
      body {
        margin: 0;
        padding: 0;
      }
    `}</style>
    <NavBar />
    {children}
  </div>
);
