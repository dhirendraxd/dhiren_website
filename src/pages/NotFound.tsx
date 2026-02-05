import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-3xl space-y-8 text-center">
        <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
          404 — Not Found
        </p>
        <h1 className="font-nekst text-4xl md:text-6xl font-semibold tracking-tight text-foreground leading-relaxed max-w-2xl mx-auto">
          This page has a lower conversion rate than a pop‑up on slow Wi‑Fi.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Consider it a digital marketing mystery: no clicks, no impressions, just pure bounce.
        </p>
        <div>
          <Link
            to="/"
            className="inline-flex items-center justify-center text-sm font-medium text-foreground underline underline-offset-4 decoration-transparent transition-colors hover:text-[#1DA1F2] hover:decoration-[#1DA1F2]"
          >
            Take me to the high‑performing homepage →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
