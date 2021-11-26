import "../styles/globals.css";

import "../styles/styles.css";
//import "../styles/ticket.css";
//import "../styles/userId.css";

import Layout from "../components/layout";
import Auth from "../context/userContext";

function MyApp({ Component, pageProps }) {
  return (
    <Auth>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth>
  );
}

export default MyApp;
