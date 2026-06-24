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
    <div className="flex items-center gap-4">
      <a
        href={siteHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#231d18] transition-colors duration-200 hover:text-[#7A3A30]"
        aria-label={sourceHref ? 'Open project website' : 'Search web for project'}
        title={sourceHref ? new URL(sourceHref).hostname.replace('www.', '') : `Search web for ${title}`}
      >
        <svg className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12h20M12 2v20M4.93 4.93c3.9 3.9 3.9 10.24 0 14.14M19.07 19.07c-3.9-3.9-3.9-10.24 0-14.14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="relative after:absolute after:left-0 after:-bottom-px after:h-px after:w-0 after:bg-[#7A3A30] after:transition-all after:duration-200 group-hover:after:w-full">
          {sourceHref ? new URL(sourceHref).hostname.replace('www.', '') : 'Web'}
        </span>
      </a>

      <span className="h-3 w-px bg-[#d4ccc4]" aria-hidden="true" />

      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#0A66C2] transition-opacity duration-200 hover:opacity-75"
        aria-label="Open LinkedIn profile"
        title="LinkedIn"
      >
        <FaLinkedinIn size={13} aria-hidden />
        <span>LinkedIn</span>
      </a>

      {showGithub && (
        <>
          <span className="h-3 w-px bg-[#d4ccc4]" aria-hidden="true" />
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-[#231d18] transition-opacity duration-200 hover:opacity-75"
            aria-label="Open GitHub"
            title="GitHub"
          >
            <FaGithub size={13} aria-hidden />
            <span>GitHub</span>
          </a>
        </>
      )}
    </div>
  );
};

export default ProjectClient;
