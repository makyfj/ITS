import React from "react";

import HeadPage from "../components/headPage";

const Credits = () => {
  return (
    <div className="contact_container">
      <HeadPage title="Credits" />
      <h1>Credits/Role(s)</h1>
      <p>
        Franklin
        <br />
        Charles
        <br />
        Thiha
        <br />
        Steve
        <br />
      </p>
      <h1>Tools/Software(s)</h1>
      <p>
        Client: JavaScript, NextJS, Redux Toolkit
        <br />
        Server: TypeScript, MongoDB, Express, NodeJS
        <br />
      </p>
    </div>
  );
};

export default Credits;
