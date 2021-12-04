import { css } from "@emotion/react";
import { FadeLoader } from "react-spinners";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: blue;
`;

const Spinner = () => {
  return (
    <div className="sweet-loading">
      <FadeLoader color="blue" loading={true} css={override} size={90} />
    </div>
  );
};

export default Spinner;
