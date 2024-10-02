import ClipLoader from "react-spinners/ClipLoader";

const Loading = ({
  isShowing,
  size,
}: {
  isShowing: boolean;
  size?: number;
}): JSX.Element => {
  return (
    <>
      <ClipLoader color={"#000000"} loading={isShowing} size={25} />
    </>
  );
};

export default Loading;
