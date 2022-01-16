import Loader from "react-loader-spinner";

const Spinner = () => {
  return (
    <Loader
      type="Puff"
      color="00bfff"
      height={100}
      width={100}
      timeout={3000}
    />
  );
};

export default Spinner;
