import React from 'react';
import { assetPath } from '@/lib/assetPath';
const untitledDesignImage = assetPath('untitled-design.webp');

type Member = {
  name: string;
  role?: string;
  img: string;
  projectWork?: string;
};

const MeetTheTeam: React.FC<{ members: Member[]; href?: string }> = ({ members }) => {
  const m = members || [];

  return (
    <section className="mt-10 mb-8">
      <div className="mx-auto max-w-[88rem] px-6">

        {/* Header */}
        <div className="border-t border-[#e9e1d6] pt-8 mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-5 bg-[#7A3A30]" aria-hidden="true" />
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[#7A3A30]">Our Team</p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <h3 className="font-rajdhani text-3xl font-bold text-[#3a3a3a] sm:text-4xl tracking-tight">Meet the team</h3>
            <p className="max-w-xs text-[0.9rem] leading-relaxed text-[#5f574d] md:text-right">
              Small team. Big impact. We design, ship, and occasionally blame the coffee.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => {
            const member = m[i];

            return (
              <div
                key={i}
                className="group relative aspect-[3/4] w-full overflow-hidden bg-[#ede8e1]"
              >
                {/* Top accent line */}
                <span className="pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#7A3A30] transition-transform duration-500 group-hover:scale-x-100 z-10" aria-hidden="true" />

                {/* Image */}
                <img
                  src={member?.img || untitledDesignImage}
                  alt={member?.name || 'Team member'}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top grayscale transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Bottom gradient with name + role */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3a3a3a]/80 via-[#3a3a3a]/25 to-transparent px-4 pb-4 pt-12 pointer-events-none">
                  <p className="font-rajdhani text-[0.88rem] font-semibold leading-tight text-[#f5f1eb]">
                    {member?.name || 'Team member'}
                  </p>
                  <p className="font-rajdhani text-[0.75rem] text-[#c8bdb4] mt-0.5 translate-y-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                    {member?.role || ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
