import "../styles/globals.css";

import "../styles/styles.css";
import "../styles/ticket.css";
//import "../styles/userId.css";

import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
