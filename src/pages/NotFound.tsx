import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import SvglIcon from "@/components/SvglIcon";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[#f5f1eb] px-6 py-10 text-[#3a3a3a] sm:px-10 lg:px-16">
      <Seo
        title="Page Not Found | Dhirendra Singh Dhami"
        description="This page does not exist on Dhirendra Singh Dhami's portfolio website."
        canonicalPath="/404"
        noIndex
      />
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center justify-center border-y border-[#ddd3c7] py-16 sm:py-20">
        <div className="w-full max-w-3xl text-center font-rajdhani">
          <div className="mb-10 flex items-end justify-center gap-4 border-b border-[#ddd3c7] pb-8 sm:gap-7">
            <span className="text-[clamp(5rem,16vw,10rem)] font-semibold leading-[0.75] tracking-[-0.08em] text-[#7A3A30]">4</span>
            <span className="text-[clamp(5rem,16vw,10rem)] font-semibold leading-[0.75] tracking-[-0.08em] text-[#3a3a3a]">0</span>
            <span className="text-[clamp(5rem,16vw,10rem)] font-semibold leading-[0.75] tracking-[-0.08em] text-[#7A3A30]">4</span>
          </div>

          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-[#7A3A30]">Page not found</p>

          <div className="mx-auto mb-8 flex items-center justify-center gap-6" aria-hidden="true">
            <div className="flex h-16 w-16 items-center justify-center">
              <SvglIcon name="Instagram" alt="" className="h-7 w-7" fallback={<span className="h-7 w-7" aria-hidden="true" />} />
            </div>

            <div className="flex h-16 w-16 items-center justify-center">
              <SvglIcon name="LinkedIn" alt="" className="h-7 w-7" fallback={<span className="h-7 w-7" aria-hidden="true" />} />
            </div>

            <div className="flex h-16 w-16 items-center justify-center">
              <SvglIcon name="Behance" alt="" className="h-7 w-7" fallback={<span className="h-7 w-7" aria-hidden="true" />} />
            </div>
          </div>

          <h1 className="mb-4 text-3xl font-semibold tracking-tight text-[#3a3a3a] sm:text-4xl md:text-5xl">
            We couldn't find that page.
          </h1>

          <p className="mx-auto max-w-[56ch] text-base leading-relaxed text-[#5f574d] mb-6">
            A minimal detour: the page you requested has no impressions here. Try the projects hub or return home.
          </p>

          <nav
            className="mx-auto grid w-full max-w-md grid-cols-2 border border-[#d8cfc3] bg-white/45 p-1 shadow-[0_12px_30px_rgba(35,29,24,0.05)]"
            aria-label="404 recovery links"
          >
            <Link
              to="/"
              className="group inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-[#7A3A30] transition-colors duration-200 hover:bg-[#7A3A30] hover:text-white"
            >
              <span>Back to Home</span>
              <span aria-hidden className="transition-transform duration-200 group-hover:-translate-x-1">←</span>
            </Link>

            <Link
              to="/projects"
              className="group inline-flex items-center justify-center gap-2 border-l border-[#d8cfc3] px-4 py-3 text-sm font-medium text-[#3f3932] transition-colors duration-200 hover:bg-[#3a3a3a] hover:text-white"
            >
              <span>Browse Projects</span>
              <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </nav>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
