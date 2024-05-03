import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-9xl pb-3">404 Not Found!</h1>
      <Link to="/" className="cursor-pointer underline text-5xl">
        Home
      </Link>
    </div>
  );
};

export default NotFound;
