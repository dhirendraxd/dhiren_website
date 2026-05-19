import React from 'react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';

type Props = {
  sourceHref?: string;
  title?: string;
  showGithub?: boolean;
};

const ProjectClient: React.FC<Props> = ({ sourceHref, title, showGithub = false }) => {
  return (
    <>
      <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">Explore: Website & Profiles</dt>
      <dd className="text-[1rem] leading-[1.8] text-[#231d18]">
        {sourceHref ? (
          <div className="flex items-center gap-3">
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-10 w-10 rounded-md text-[#231d18] hover:bg-[#f3eae2] hover:text-[#7A3A30]"
              aria-label="Open project website"
              title={new URL(sourceHref).hostname.replace('www.', '')}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12h20M12 2v20M4.93 4.93c3.9 3.9 3.9 10.24 0 14.14M19.07 19.07c-3.9-3.9-3.9-10.24 0-14.14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <span className="text-sm text-[#554b41] hidden sm:inline">{new URL(sourceHref).hostname.replace('www.', '')}</span>

            <a
              href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(title || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center h-10 w-10 rounded-md text-[#0A66C2] hover:bg-[#e8f2ff] hover:text-[#08539d]"
              aria-label="Search on LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn size={20} aria-hidden />
            </a>

            {showGithub && (
              <a
                href={`https://github.com/search?q=${encodeURIComponent(title || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center h-10 w-10 rounded-md text-[#181717] hover:bg-[#f3f3f3] hover:text-[#15120d]"
                aria-label="Search on GitHub"
                title="GitHub"
              >
                <FaGithub size={20} aria-hidden />
              </a>
            )}
          </div>
        ) : (
          '—'
        )}
      </dd>
    </>
  );
};

export default ProjectClient;
