import React, { useState } from 'react';
import untitledDesignImage from '@/assets/Untitled design.webp';

type Member = {
  name: string;
  role?: string;
  img: string;
  projectWork?: string;
};

const MeetTheTeam: React.FC<{ members: Member[]; href?: string }> = ({ members, href = '/team' }) => {
  const m = members || [];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="mt-6 mb-8">
      <div className="mx-auto max-w-[88rem] px-6">
        <div className="md:flex md:items-center md:justify-between md:gap-6">
          <div>
            <div className="text-sm uppercase tracking-wider text-muted-foreground font-semibold">Our Team</div>
            <h3 className="mt-2 text-3xl sm:text-4xl font-rajdhani font-bold text-[#3f3932]">Meet the team</h3>
          </div>

          <div className="mt-3 md:mt-0 md:text-right md:max-w-md">
            <p className="text-[#5f574d]">Small team. Big impact. We design, ship, and occasionally blame the coffee.</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 justify-items-center gap-6">
          {[0, 1, 2, 3].map((i) => {
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
                className={`relative w-full max-w-[11rem] sm:max-w-[12rem] lg:max-w-[13rem] aspect-square overflow-hidden rounded-none bg-[#f2efe9] transition-all duration-200 ${
                  isOtherHovered ? 'opacity-60' : isHovered ? 'scale-105 z-10' : ''
                }`}
              >
                <img
                  src={untitledDesignImage}
                  alt={m[i]?.name || 'Team member'}
                  className="h-full w-full object-cover object-center"
                  style={{
                    filter: 'grayscale(100%)',
                    transition: 'transform 200ms ease, opacity 200ms ease',
                  }}
                />
                {/* Hover/focus overlay showing short role/bio */}
                <div
                  aria-hidden={!isHovered}
                  className={`absolute inset-0 flex items-end p-4 transition-opacity duration-200 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="w-full bg-gradient-to-t from-[rgba(0,0,0,0.75)] to-transparent p-3">
                    <div className="text-sm font-rajdhani text-white">{m[i]?.projectWork || m[i]?.role || 'Team member'}</div>
                  </div>
                </div>
                <div className="absolute left-3 bottom-3 text-white">
                  <div className="text-sm font-rajdhani font-semibold drop-shadow">{m[i]?.name}</div>
                </div>
              {i === 3 && (
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center justify-center h-6 w-6 bg-white/90 text-[#7a3a30] text-[0.7rem] font-semibold rounded-sm">in</span>
                </div>
              )}
            </div>
          );
          })}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
