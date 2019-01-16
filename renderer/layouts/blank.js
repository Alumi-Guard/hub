import Head from "next/head";
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
    {children}
  </div>
);
