import React, { useState } from 'react';

type Member = {
  name: string;
  role?: string;
  img: string;
};

const MeetTheTeam: React.FC<{ members: Member[]; href?: string }> = ({ members, href = '/team' }) => {
  const m = members || [];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="mt-6 mb-8">
      <div className="mx-auto max-w-[88rem] px-6">
        <div className="flex items-baseline justify-between">
          <div aria-hidden />
          <span className="font-rajdhani text-4xl sm:text-5xl font-bold leading-tight text-[#3f3932]">Meet the team</span>
        </div>

        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
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
                className={`relative w-full aspect-square overflow-hidden rounded-none bg-[#f2efe9] transition-all duration-200 ${
                  isOtherHovered ? 'opacity-40' : isHovered ? 'scale-105 z-10' : ''
                }`}
              >
                <img
                  src={m[i]?.img}
                  alt={m[i]?.name}
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
                  <div className="w-full bg-gradient-to-t from-[rgba(0,0,0,0.7)] to-transparent p-3">
                    <div className="text-sm font-rajdhani text-white">{m[i]?.role || 'Team member'}</div>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;
