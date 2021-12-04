import React from "react";

import HeadPage from "../components/headPage";
import Notification from "../components/notification";

const Home = () => {
  return (
    <div className="outer">
      <HeadPage title="Incident Tracking System" />
      <h1>Incident Tracking System - Homepage</h1>
      <div className="aboutBloc">
        <h1>About</h1>
        <Notification />
        <p>
          Welcome to the Incident Tracking System. This is a System used to
          track certain incidents across the net. You will need to create an
          account to log or view incidents. Click on the
          {"'Register'"} tab to create an account, if you have not done so.
        </p>

        <hr />
      </div>
    </div>
  );
};

export default Home;
