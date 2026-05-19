import React from 'react';
import { FaLinkedinIn } from 'react-icons/fa';

type Props = {
  sourceHref?: string;
  title?: string;
};

const ProjectClient: React.FC<Props> = ({ sourceHref, title }) => {
  return (
    <>
      <dt className="text-[0.85rem] font-semibold uppercase text-[#6b6259]">View more : Client</dt>
      <dd className="text-[1rem] leading-[1.8] text-[#231d18]">
        {sourceHref ? (
          <div className="flex items-center gap-3">
            <a
              href={sourceHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#231d18] hover:bg-[#f3eae2] hover:text-[#7A3A30]"
              aria-label="Open project website"
              title={new URL(sourceHref).hostname.replace('www.', '')}
            >
              <img src="/favicon.png" alt="Site logo" className="h-4 w-4 object-contain" />
            </a>

            <span className="text-sm text-[#554b41] hidden sm:inline">{new URL(sourceHref).hostname.replace('www.', '')}</span>

            <a
              href={`https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(title || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center h-8 w-8 rounded-md text-[#0A66C2] hover:bg-[#e8f2ff] hover:text-[#08539d]"
              aria-label="Search on LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn size={18} aria-hidden />
            </a>
          </div>
        ) : (
          '—'
        )}
      </dd>
    </>
  );
};

export default ProjectClient;
