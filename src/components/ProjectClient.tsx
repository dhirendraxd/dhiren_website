import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

type Props = {
  sourceHref?: string;
  title?: string;
  showGithub?: boolean;
};

const ProjectClient: React.FC<Props> = ({ sourceHref, title, showGithub = false }) => {
  const siteHref = sourceHref || `https://www.google.com/search?q=${encodeURIComponent(title || '')}`;
  const linkedInHref = `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(title || '')}`;
  const githubHref = `https://github.com/search?q=${encodeURIComponent(title || '')}`;

  return (
    <>
      <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259] mt-4">Explore</dt>
      <dd className="text-[1rem] leading-[1.8] text-[#231d18]">
        <div className="flex items-center gap-5 flex-nowrap">
          <a
            href={siteHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-md text-[#231d18] transition-transform duration-200 hover:scale-110"
            aria-label={sourceHref ? 'Open project website' : 'Search web for project'}
            title={sourceHref ? new URL(sourceHref).hostname.replace('www.', '') : `Search web for ${title}`}
          >
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12h20M12 2v20M4.93 4.93c3.9 3.9 3.9 10.24 0 14.14M19.07 19.07c-3.9-3.9-3.9-10.24 0-14.14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-md text-[#0A66C2] transition-transform duration-200 hover:scale-110"
            aria-label="Open LinkedIn profile"
            title="LinkedIn"
          >
            <FaLinkedinIn size={32} aria-hidden />
          </a>

          {showGithub && (
            <a
              href={githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-12 w-12 sm:h-16 sm:w-16 rounded-md text-[#181717] transition-transform duration-200 hover:scale-110"
              aria-label="Open GitHub"
              title="GitHub"
            >
              <FaGithub size={32} aria-hidden />
            </a>
          )}
        </div>
      </dd>
    </>
  );
};

export default ProjectClient;
