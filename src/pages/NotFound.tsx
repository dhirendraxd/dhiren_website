import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20">
      <Seo
        title="Page Not Found | Dhirendra Singh Dhami"
        description="This page does not exist on Dhirendra Singh Dhami's portfolio website."
        canonicalPath="/404"
        noIndex
      />
      <Navbar />
      <div className="flex items-center justify-center px-6 pb-12 pt-28 sm:pt-32">
        <div className="w-full max-w-2xl text-center font-rajdhani">
          <p className="text-xs uppercase tracking-[0.28em] text-[#7A3A30] mb-6">404 — Page Missing</p>

          <div className="mx-auto mb-6 flex items-center justify-center gap-6">
            {/* Tech node */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7A3A30]/10 to-transparent">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 3v3" stroke="#7A3A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 18v3" stroke="#7A3A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 7.5l2.12 2.12" stroke="#7A3A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19.38 16.38l-2.12-2.12" stroke="#7A3A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="2.2" stroke="#7A3A30" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Megaphone / Marketing */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1DA1F2]/8 to-transparent">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 11h2l7-4v10L5 13H3v-2z" stroke="#1DA1F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 8a3 3 0 010 8" stroke="#1DA1F2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Analytics sparkline */}
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#7A3A30]/6 to-transparent">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M3 17h3l4-6 3 4 5-8 2 6" stroke="#7A3A30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <rect x="2" y="2" width="20" height="20" rx="4" stroke="#e9e1d6" strokeWidth="0.8"/>
              </svg>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-rajdhani font-semibold tracking-tight text-[#231d18] mb-4">
            We couldn't find that page.
          </h1>

          <p className="mx-auto max-w-[56ch] text-base leading-relaxed text-[#5f574d] mb-6">
            A minimal detour: the page you requested has no impressions here. Try the projects hub or return home.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 rounded-none bg-[#7A3A30] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#7A3A30]/90"
            >
              <span>View Projects</span>
              <span className="ml-2 inline-block opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">→</span>
            </Link>

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#3f3932] underline underline-offset-4 decoration-transparent transition-colors hover:text-[#7A3A30]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
