import "../styles/globals.css";
import "../styles/layout.css";
import "../styles/login.css";
import "../styles/home.css";
import "../styles/contact.css";

import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
