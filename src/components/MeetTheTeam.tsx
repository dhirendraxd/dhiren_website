import React, { useState } from 'react';
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
  const [hovered, setHovered] = useState<number | null>(null);

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
            <h3 className="font-rajdhani text-3xl font-bold text-[#231d18] sm:text-4xl tracking-tight">Meet the team</h3>
            <p className="max-w-xs text-[0.9rem] leading-relaxed text-[#5f574d] md:text-right">
              Small team. Big impact. We design, ship, and occasionally blame the coffee.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => {
            const member = m[i];
            const isOtherHovered = hovered !== null && hovered !== i;
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                className={`relative aspect-[3/4] w-full overflow-hidden bg-[#ede8e1] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7A3A30] ${
                  isOtherHovered ? 'opacity-35 scale-[0.97]' : isHovered ? 'z-10' : ''
                }`}
              >
                {/* Image */}
                <img
                  src={member?.img || untitledDesignImage}
                  alt={member?.name || 'Team member'}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full object-cover object-top grayscale transition-transform duration-500 ${
                    isHovered ? 'scale-[1.06]' : 'scale-100'
                  }`}
                />

                {/* Always-visible bottom gradient with name */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#231d18]/85 via-[#231d18]/30 to-transparent px-4 pb-4 pt-12 pointer-events-none">
                  <p className="font-rajdhani text-[0.88rem] font-semibold leading-tight text-[#f5f1eb]">
                    {member?.name || 'Team member'}
                  </p>

                  {/* Role slides in on hover */}
                  <p
                    className={`font-rajdhani text-[0.75rem] text-[#c8bdb4] mt-0.5 transition-all duration-300 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1.5'
                    }`}
                  >
                    {member?.role || ''}
                  </p>
                </div>

                {/* Maroon bottom accent line */}
                <div
                  className={`absolute inset-x-0 bottom-0 h-[2px] bg-[#7A3A30] transition-all duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
