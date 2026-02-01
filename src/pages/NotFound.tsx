import { Link } from "react-router-dom";
import notFoundImage from "@/assets/notfoudn page .png";

const NotFound = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <img
        src={notFoundImage}
        alt="Not found"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Well, this is awkward.
          </h1>
          <p className="text-lg text-neutral-700 tracking-tight">
            You found a page that doesn’t exist. It’s as lost as your last Google search.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
